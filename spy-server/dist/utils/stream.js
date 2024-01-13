"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decoder_1 = __importDefault(require("./decoder"));
const decoder = new decoder_1.default();
class Stream {
    init(request) {
        const webhook = request.body;
        if (!webhook || !webhook.logs || webhook.confirmed)
            return null;
        const event = webhook.tag;
        const messages = [];
        try {
            for (const log of webhook.logs) {
                const format = decoder.dispatchFormat(event);
                // abi format does not exists for event data
                if (format == null || typeof format === 'undefined')
                    continue;
                const hash = log.transactionHash;
                const data = decoder.decodeLog(format, log.data);
                // object is invalid
                const message = decoder.toDisptachModel(event, data, hash, webhook.chainId);
                if (message == null || typeof message === 'undefined')
                    continue;
                messages.push(message);
            }
            return messages;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
exports.default = Stream;
