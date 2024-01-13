"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    messageId: String,
    status: String,
    fromTrxHash: String,
    toTrxHash: String,
    fee: String,
    feeToken: String,
    sequenceNumber: Number,
    fromChainId: Number,
    toChainId: String,
    sender: String,
    receiver: String,
    tokens: Array,
    payMaster: Number,
    payload: String,
    initializedTimestamp: Number,
    deliveredTimestamp: Number,
    failedTimestamp: Number,
    retriedTimestamp: Number
}, { timestamps: false });
const MessageSchema = mongoose_1.default.model('MessageSchema', messageSchema);
exports.default = MessageSchema;
