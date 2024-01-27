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
const web3_1 = __importDefault(require("web3"));
const chains_config_1 = __importDefault(require("../configs/chains.config"));
const controllers_1 = require("../controllers");
const cron_1 = require("cron");
const fs_1 = __importDefault(require("fs"));
const status_1 = require("../models/status");
const controller = new controllers_1.Controller();
const Metreon = require('../abis/Metreon.json');
class Index {
    constructor() { }
    listen() {
        this.startListening(chains_config_1.default.AreonTestnet);
        fs_1.default.writeFileSync(`events/config${chains_config_1.default.AreonTestnet}.index.json`, `{
                    "fromBlocks": {
                        "${chains_config_1.default.AreonTestnet}": null
                    }
                }`);
    }
    startListening(chainId) {
        const job = new cron_1.CronJob('*/20 * * * * *', function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = fs_1.default.readFileSync(`events/config${chainId}.index.json`, "utf-8");
                    const json = JSON.parse(data);
                    const web3 = new web3_1.default(chains_config_1.default.rpcs[chainId]);
                    const metreon = new web3.eth.Contract(Metreon.abi, chains_config_1.default.metreonIds[chainId]);
                    const latestBlock = yield web3.eth.getBlockNumber();
                    const fromBlock = json.fromBlocks[chainId];
                    console.log(`Indexer: Running Job from ${fromBlock} to ${latestBlock}`);
                    if (fromBlock == latestBlock)
                        return;
                    if (fromBlock) {
                        metreon.getPastEvents('Dispatch', { fromBlock, toBlock: 'latest' }, function (error, events) {
                            if (error) {
                                console.log('Index: startListening ', error);
                                return;
                            }
                            const messages = [];
                            for (let index = 0; index < events.length; index++) {
                                const event = events[index];
                                const tokens = [];
                                for (let index = 0; index < event.returnValues.tokens.length; index++) {
                                    const token = event.returnValues.tokens[index];
                                    tokens.push({ tokenId: token.tokenId, amount: token.amount });
                                }
                                const message = {
                                    messageId: event.returnValues.messageId,
                                    status: status_1.Status.INITIATED,
                                    fromTrxHash: event.transactionHash,
                                    fee: event.returnValues.fee,
                                    feeToken: event.returnValues.feeToken,
                                    sequenceNumber: event.returnValues.sequenceNumber,
                                    fromChainId: chainId,
                                    toChainId: event.returnValues.toChainId,
                                    sender: event.returnValues.sender,
                                    receiver: event.returnValues.receiver,
                                    tokens: tokens,
                                    payMaster: event.returnValues.payMaster,
                                    payload: event.returnValues.payload
                                };
                                messages.push(message);
                                controller.processMessages(messages);
                            }
                        });
                    }
                    fs_1.default.writeFileSync(`events/config${chainId}.index.json`, `{
                    "fromBlocks": {
                        "${chainId}": ${latestBlock}
                    }
                }`);
                    console.log(`Indexer: Ending Job at ${latestBlock}`);
                }
                catch (error) {
                    console.error(error);
                    if (!job.running) {
                        job.start();
                    }
                }
            });
        });
        job.start();
    }
}
exports.default = Index;
