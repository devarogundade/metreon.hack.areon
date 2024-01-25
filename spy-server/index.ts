import cors from "cors";
import Route from "./routes";
import express from "express";
import mongoose from "mongoose";
import DbConfig from "./configs/db.config";
import Index from "./events";
import { Controller } from "./controllers";

const app = express();

const corsOptions = {
    // origin: ""
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const route = new Route();
const index = new Index();

mongoose.connect(DbConfig.url)
    .then(() => {
        console.log("Connected to the database!");

        route.init(app);
        index.listen();

        // test bridge
        // const controller = new Controller();
        // controller.processMessages([{
        //     messageId: '0x01081067a68a47051f742282e0efff746526a7d4f54d0bf95d970f8db283c5e3',
        //     status: 0,
        //     fromTrxHash: '0xfdaffb66c27bd4215e4f9e1eedcffa038bfb6daf23e0472c457e9336fa3d4248',
        //     fee: '640000000000000',
        //     feeToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        //     sequenceNumber: 9,
        //     fromChainId: 462,
        //     toChainId: 97,
        //     sender: '0x345B1459B1115Fa2428246B2f3C3207F643A5bbE',
        //     receiver: '0x345B1459B1115Fa2428246B2f3C3207F643A5bbE',
        //     tokens: [
        //         {
        //             tokenId: '0x85A637834544Fc824a4A2106Dbd88a586C55b6cf',
        //             amount: '5000000000000000000'
        //         }
        //     ],
        //     payMaster: 1,
        //     payload: '0x00000000000000000000000060e0a0ead051314e7510ae803334a97f13e6ff21',
        //     initializedTimestamp: 1706208848
        // }]);
    })
    .catch((error: Error) => {
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