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
const express_1 = require("express");
const controllers_1 = require("../controllers");
const stream_1 = __importDefault(require("../utils/stream"));
const router = (0, express_1.Router)();
const stream = new stream_1.default();
const controller = new controllers_1.Controller();
class Route {
    init(app) {
        router.post('/moralis/events', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const messages = stream.init(req);
            console.log('Moralis events: ', messages);
            if (!messages) {
                return res.send('No message was passed');
            }
            const result = controller.processMessages(messages);
            res.status(result.status).send(result);
        }));
        router.get('/messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { take, skip } = req.query;
            const query = req.body;
            const result = yield controller.allMessages(Number(take), Number(skip), query);
            res.status(result.status).send(result);
        }));
        router.get('/messages/:hash', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { hash } = req.params;
            const result = yield controller.message(hash);
            res.status(result.status).send(result);
        }));
        app.use('/', router);
    }
}
exports.default = Route;
