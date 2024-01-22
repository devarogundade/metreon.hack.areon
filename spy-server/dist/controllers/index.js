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
exports.Controller = void 0;
const worker_threads_1 = require("worker_threads");
const schemas_1 = __importDefault(require("../database/schemas"));
const path_1 = __importDefault(require("path"));
class Controller {
    processMessages(messages) {
        messages.forEach(message => {
            new worker_threads_1.Worker(path_1.default.join(__dirname, "../workers/index.js"), {
                workerData: { message }
            });
        });
        return { status: 200 };
    }
    allMessages(take, skip, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield schemas_1.default.countDocuments();
                const data = yield schemas_1.default.find(query)
                    .limit(take * 1)
                    .skip((skip - 1) * take)
                    .sort({ dispatchTimestamp: 'desc' });
                return {
                    status: 200,
                    data: {
                        total: count,
                        lastPage: Math.ceil(count / take),
                        data: data
                    }
                };
            }
            catch (error) {
                return { status: 400 };
            }
        });
    }
    message(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield schemas_1.default.findOne({
                    $or: [
                        { messageId: hash },
                        { fromTrxHash: hash },
                        { toTrxHash: hash }
                    ]
                });
                return {
                    status: 200,
                    data: data
                };
            }
            catch (error) {
                return { status: 400 };
            }
        });
    }
}
exports.Controller = Controller;
