"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = __importDefault(require("./configs/db.config"));
const events_1 = __importDefault(require("./events"));
const controllers_1 = require("./controllers");
const app = (0, express_1.default)();
const corsOptions = {
    // origin: ""
};
app.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
const route = new routes_1.default();
const index = new events_1.default();
mongoose_1.default.connect(db_config_1.default.url)
    .then(() => {
        console.log("Connected to the database!");
        route.init(app);
        index.listen();
        // test bridge
        const controller = new controllers_1.Controller();
        controller.processMessages([{
            messageId: '0x01081067a68a47051f742282e0efff746526a7d4f54d0bf95d970f8db283c5e3',
            status: 0,
            fromTrxHash: '0xfdaffb66c27bd4215e4f9e1eedcffa038bfb6daf23e0472c457e9336fa3d4248',
            fee: '640000000000000',
            feeToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
            sequenceNumber: 9,
            fromChainId: 462,
            toChainId: 97,
            sender: '0x345B1459B1115Fa2428246B2f3C3207F643A5bbE',
            receiver: '0x345B1459B1115Fa2428246B2f3C3207F643A5bbE',
            tokens: [
                {
                    tokenId: '0x85A637834544Fc824a4A2106Dbd88a586C55b6cf',
                    amount: '5000000000000000000'
                }
            ],
            payMaster: 1,
            payload: '0x00000000000000000000000060e0a0ead051314e7510ae803334a97f13e6ff21',
            initializedTimestamp: 1706208848
        }]);
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });
app.get("/", (_, res) => {
    res.json({ message: "Metreon RPC Node V1" });
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`⚡ Server is on port ${PORT}.`);
});
