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
            messageId: '0xdc9687b0e72f65543213f1d3bbacd0c860b040b0e516bdc9bd9e3b835febf7ff',
            status: 0,
            fromTrxHash: '0x87aaa337be102c874a4551182a67a86c3c0ec8e17a17a1fab237cf4848a3c77e',
            fee: '640000000000000',
            feeToken: '0x0000000000000000000000000000000000000000',
            sequenceNumber: 5,
            fromChainId: 462,
            toChainId: 97,
            sender: '0x5c3bA76382E26b9f3a2d22CB33cb44Ad4b144643',
            receiver: '0x8347533ec822aA34204776c9D3f910f96abDc939',
            tokens: [
                {
                    tokenId: '0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e',
                    amount: '5000000000000000000'
                }
            ],
            payMaster: 1,
            payload: '0x00000000000000000000000060e0a0ead051314e7510ae803334a97f13e6ff21',
            initializedTimestamp: 1706227685
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
