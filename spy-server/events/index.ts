import Web3 from "web3";
import Config from "../configs/chains.config";
import { Controller } from "../controllers";
import { CronJob } from 'cron';
import fs from 'fs';
import { Message } from "../models/message";
import { Status } from "../models/status";

const controller = new Controller();
const Metreon = require('../abis/Metreon.json');

class Index {
    startListening() {
        const job = new CronJob('*/10 * * * * *', async function () {
            try {
                const data = fs.readFileSync('events/config.index.json', "utf-8");
                const json = JSON.parse(data);

                const fromBlock = json.fromBlocks[462];

                console.log(`Indexer: Running Job from ${fromBlock}`);

                const web3 = new Web3(Config.rpcs[462]);
                const w3link = new web3.eth.Contract(Metreon.abi, Config.metreonIds[462]);

                const latestBlock = await web3.eth.getBlockNumber();
                console.log('Indexer: Lastest Block ', latestBlock);

                if (fromBlock == latestBlock) return;

                w3link.getPastEvents('SendMessage', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error: Error, events) {
                    console.log('Indexer: Error ', error);
                    console.log('Indexer: Events ', events);

                    if (error) {
                        console.log('Index: startListening ', error);
                        return;
                    }

                    const messages: Message[] = [];

                    for (let index = 0; index < events.length; index++) {
                        const event = events[index];

                        const message: Message = {
                            messageId: event.returnValues.messageId,
                            status: Status.INITIATED,
                            fromTrxHash: event.transactionHash,
                            fee: event.returnValues.fee,
                            feeToken: event.returnValues.feeToken,
                            sequenceNumber: event.returnValues.sequenceNumber,
                            fromChainId: 462,
                            toChainId: event.returnValues.toChainId,
                            sender: event.returnValues.sender,
                            receiver: event.returnValues.receiver,
                            tokens: event.returnValues.tokens,
                            payMaster: event.returnValues.payMaster,
                            payload: event.returnValues.payload
                        };

                        messages.push(message);

                        controller.processMessages(messages);
                    }
                });

                fs.writeFileSync('events/config.index.json', JSON.stringify(
                    {
                        fromBlocks: {
                            462: latestBlock
                        }
                    },
                    null, 1
                ));

                console.log(`Indexer: Ending Job at ${latestBlock}`);
            } catch (error) {
                console.error(error);
                if (!job.running) {
                    job.start();
                }
            }
        });

        job.start();
    }
}

export default Index;