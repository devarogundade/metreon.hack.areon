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
    startListening() {
        const job = new cron_1.CronJob('*/10 * * * * *', function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = fs_1.default.readFileSync('events/config.index.json', "utf-8");
                    const json = JSON.parse(data);
                    const fromBlock = json.fromBlocks[462];
                    console.log(`Indexer: Running Job from ${fromBlock}`);
                    const web3 = new web3_1.default(chains_config_1.default.rpcs[462]);
                    const w3link = new web3.eth.Contract(Metreon.abi, chains_config_1.default.metreonIds[462]);
                    const latestBlock = yield web3.eth.getBlockNumber();
                    console.log('Indexer: Lastest Block ', latestBlock);
                    if (fromBlock == latestBlock)
                        return;
                    w3link.getPastEvents('SendMessage', { filter: {}, fromBlock: fromBlock, toBlock: 'latest' }, function (error, events) {
                        console.log('Indexer: Error ', error);
                        console.log('Indexer: Events ', events);
                        if (error) {
                            console.log('Index: startListening ', error);
                            return;
                        }
                        const messages = [];
                        for (let index = 0; index < events.length; index++) {
                            const event = events[index];
                            const message = {
                                messageId: event.returnValues.messageId,
                                status: status_1.Status.INITIATED,
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
                    fs_1.default.writeFileSync('events/config.index.json', JSON.stringify({
                        fromBlocks: {
                            462: latestBlock
                        }
                    }, null, 1));
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
