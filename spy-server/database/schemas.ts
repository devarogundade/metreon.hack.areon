import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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

const MessageSchema = mongoose.model('MessageSchema', messageSchema);

export default MessageSchema;