"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const status_1 = require("../models/status");
class Decoder {
    decodeLog(format, value) {
        const web3 = new web3_1.default('https://rpc.ankr.com/eth');
        return web3.eth.abi.decodeParameters(format, value);
    }
    dispatchFormat(event) {
        if (event == 'sendMessage') {
            return ['bytes32', 'uint256', 'address', 'uint256', 'uint256', 'address', 'address', '(address,uint256)[]', 'uint8', 'bytes'];
        }
        return null;
    }
    toDisptachModel(event, data, transactionHash, fromChainId) {
        if (event == 'sendMessage') {
            return {
                messageId: data[0],
                status: status_1.Status.INITIATED,
                fee: data[1],
                feeToken: data[2],
                sequenceNumber: data[3],
                fromChainId: fromChainId,
                toChainId: data[4],
                sender: data[5],
                receiver: data[6],
                tokens: data[7],
                payMaster: data[8],
                payload: data[9],
                fromTrxHash: transactionHash
            };
        }
        return null;
    }
}
exports.default = Decoder;
