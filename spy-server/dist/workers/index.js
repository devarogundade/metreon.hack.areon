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
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = __importDefault(require("../configs/db.config"));
dotenv_1.default.config();
const Metreon = require('../abis/Metreon.json');
// Signing Key and Address
const handlerEvmKey = process.env.EVM_PRIVATE_KEY;
var PayMaster;
(function (PayMaster) {
    PayMaster[PayMaster["SENDER"] = 0] = "SENDER";
    PayMaster[PayMaster["METREON_PAY"] = 1] = "METREON_PAY";
})(PayMaster || (PayMaster = {}));
class Worker {
    initializeTrx(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.recordMessage(message);
                const signedMessage = yield this.signTransaction(message);
                this.recordMessage(signedMessage);
            }
            catch (error) {
                console.log(error);
                message.failedTimestamp = Math.ceil((Date.now() / 1000));
                message.status = status_1.Status.FAILED;
                this.recordMessage(message);
            }
        });
    }
    signTransaction(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default(chains_config_1.default.rpcs[message.toChainId]);
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
            const metreon = new web3.eth.Contract(Metreon.abi, chains_config_1.default.metreonIds[message.toChainId]);
            console.log(incomingMessage);
            const gas = yield metreon.methods.postMessage(message.receiver, incomingMessage, tokenPool).estimateGas({ from: signer.address });
            console.log('Gas: ', gas);
            const gasPrice = yield web3.eth.getGasPrice();
            console.log('Gas Price: ', gasPrice);
            const { transactionHash } = yield metreon.methods.postMessage(message.receiver, incomingMessage, tokenPool).send({
                from: signer.address,
                gasPrice: gasPrice,
                gas: gas
            });
            message.toTrxHash = transactionHash;
            message.deliveredTimestamp = Math.ceil((Date.now() / 1000));
            message.status = status_1.Status.DELIVERED;
            return message;
        });
    }
    recordMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Saving: ', message);
            const savedMessage = yield schemas_1.default.findOne({
                $or: [
                    { messageId: message.messageId }
                ]
            });
            if ((savedMessage === null || savedMessage === void 0 ? void 0 : savedMessage.status) == status_1.Status.DELIVERED.toString()) {
                return;
            }
            yield schemas_1.default.findOneAndUpdate({ messageId: message.messageId }, { $set: message }, {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            });
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(db_config_1.default.url);
    const worker = new Worker();
    const { message } = worker_threads_1.workerData;
    switch (message.status) {
        case status_1.Status.INITIATED:
            message.initializedTimestamp = Math.ceil((Date.now() / 1000));
            const txID = yield worker.initializeTrx(message);
            console.log(txID);
            worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(txID);
            break;
        case status_1.Status.RETRY:
            message.retriedTimestamp = Math.ceil((Date.now() / 1000));
            break;
        default:
            break;
    }
}))();
