import { URL } from 'node:url';
import { Status } from '../models/status';
import { Message } from './../models/message';
import { parentPort, workerData } from "worker_threads";
import MessageSchema from '../database/schemas';
import Config from '../configs/chains.config';
import env from 'dotenv';
import Web3 from 'web3';
import mongoose from 'mongoose';
import DbConfig from '../configs/db.config';
import { Token } from '../models/token';

env.config();

const MetreonReceiver = require('../abis/MetreonReceiver.json');

// Signing Key and Address
const handlerEvmKey = process.env.EVM_PRIVATE_KEY!!;

enum PayMaster {
    SENDER,
    METREON_PAY
}

interface IncomingMessage {
    messageId: string;
    fromChainId: number;
    sender: string;
    payload: string;
    tokens: Token[];
    payMaster: PayMaster;
}

class Worker {
    async initializeTrx(message: Message) {
        try {
            await this.recordMessage(message);

            const signedMessage = await this.signTransaction(message);

            this.recordMessage(signedMessage);
        } catch (error) {
            console.log(error);
            message.failedTimestamp = Math.ceil((Date.now() / 1000));
            message.status = Status.FAILED;

            this.recordMessage(message);
        }
    }

    private async signTransaction(message: Message): Promise<Message> {
        const web3 = new Web3(Config.rpcs[message.toChainId]);

        const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
        web3.eth.accounts.wallet.add(signer);

        const incomingMessage: IncomingMessage = {
            messageId: message.messageId,
            fromChainId: message.fromChainId,
            sender: message.sender,
            payload: message.payload,
            tokens: message.tokens,
            payMaster: message.payMaster
        };

        const tokenPool = Config.tokenPoolIds[message.toChainId];

        const metreonReceiver = new web3.eth.Contract(MetreonReceiver.abi, message.receiver);

        const gas = await metreonReceiver.methods.metreonReceive(
            incomingMessage, tokenPool
        ).estimateGas({ from: signer.address });
        console.log('Gas: ', gas);

        const gasPrice = await web3.eth.getGasPrice();
        console.log('Gas Price: ', gasPrice);

        const { transactionHash } = await metreonReceiver.methods.metreonReceive(
            incomingMessage, tokenPool
        ).send({
            from: signer.address,
            gasPrice: gasPrice,
            gas: gas
        });

        message.toTrxHash = transactionHash;
        message.deliveredTimestamp = Math.ceil((Date.now() / 1000));
        message.status = Status.DELIVERED;

        return message;
    }

    private async recordMessage(message: Message): Promise<void> {
        console.log('Saving: ', message);

        const savedMessage = await MessageSchema.findOne({
            $or: [
                { messageId: message.messageId }
            ]
        });

        if (savedMessage?.status == Status.DELIVERED.toString()) {
            return;
        }

        await MessageSchema.findOneAndUpdate(
            { messageId: message.messageId },
            { $set: message },
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            });
    }
}

(async () => {
    await mongoose.connect(DbConfig.url);

    const worker = new Worker();

    const { message }: { message: Message; } = workerData;

    switch (message.status) {
        case Status.INITIATED:
            message.initializedTimestamp = Math.ceil((Date.now() / 1000));

            const txID = await worker.initializeTrx(message);

            console.log(txID);
            parentPort?.postMessage(txID);

            break;

        case Status.RETRY:
            message.retriedTimestamp = Math.ceil((Date.now() / 1000));

            break;

        default:
            break;
    }
})();