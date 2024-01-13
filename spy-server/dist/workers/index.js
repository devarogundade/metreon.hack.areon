"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("../models/status");
const worker_threads_1 = require("worker_threads");
const schemas_1 = __importDefault(require("../database/schemas"));
const chains_config_1 = __importDefault(require("../configs/chains.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const web3_1 = __importDefault(require("web3"));
dotenv_1.default.config();
const MetreonReceiver = require('../abis/MetreonReceiver.json');
// Signing Key and Address
const handlerEvmKey = process.env.HANDLER_EVM_PRIVATE_KEY;
class Worker {
    init(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.recordTransaction(message);
                const signedMessage = yield this.signTransaction(message);
                yield this.recordTransaction(signedMessage);
            }
            catch (error) {
                console.log(error);
                message.failedTimestamp = (Date.now() / 1000);
                message.status = status_1.Status.FAILED;
                this.recordTransaction(message);
            }
        });
    }
    signTransaction(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default(chains_config_1.default.rpcs[message.toChainId]);
            const metreonReceiver = new web3.eth.Contract(MetreonReceiver.abi, message.receiver);
            const signer = web3.eth.accounts.privateKeyToAccount(handlerEvmKey);
            web3.eth.accounts.wallet.add(signer);
            const incomingMessage = {
                messageId: message.messageId,
                fromChainId: message.fromChainId,
                sender: message.sender,
                payload: message.payload,
                tokens: message.tokens,
                payMaster: message.payMaster
            };
            const tokenPool = chains_config_1.default.tokenPoolIds[message.toChainId];
            const gas = yield metreonReceiver.methods.metreonReceive(incomingMessage, tokenPool).estimateGas({ from: signer.address });
            console.log('Gas: ', gas);
            const gasPrice = yield web3.eth.getGasPrice();
            console.log('Gas Price: ', gasPrice);
            const { transactionHash } = yield metreonReceiver.methods.metreonReceive(incomingMessage, tokenPool).send({
                from: signer.address,
                gasPrice: gasPrice,
                gas: gas
            });
            message.toTrxHash = transactionHash;
            message.deliveredTimestamp = (Date.now() / 1000);
            return message;
        });
    }
    recordTransaction(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = new schemas_1.default(message);
            yield schema.save();
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const worker = new Worker();
    const { message } = worker_threads_1.workerData;
    switch (message.status) {
        case status_1.Status.INITIATED:
            message.initializedTimestamp = (Date.now() / 1000);
            const txID = yield worker.init(message);
            console.log(txID);
            worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(txID);
            break;
        case status_1.Status.RETRY:
            message.retriedTimestamp = (Date.now() / 1000);
            break;
        default:
            break;
    }
}))();
