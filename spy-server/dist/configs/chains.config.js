"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = {
    Sepolia: 11155111,
    Mumbai: 80001,
    BnbTestnet: 97,
    AreonTestnet: 462,
    metreonIds: {
        11155111: '0x6b7f336e63428eE87be73c9DB3Ad9eFBF0DAd7e8',
        80001: '0x71782B79822001b88E717b991C95535a836391C2',
        97: '0xC734ca06CDAe04A3E0A78255DFbabB81665aa508',
        462: '0x710cCf9304597c75D879fF315BF093078ba30D9c'
    },
    rpcs: {
        11155111: 'https://rpc.notadegen.com/eth/sepolia',
        80001: 'https://rpc.ankr.com/polygon_mumbai',
        97: 'https://bsc-testnet.public.blastapi.io',
        462: 'https://testnet-rpc.areon.network'
    },
    wss: {
        462: 'wss://testnet-ws.areon.network'
    },
    tokenPoolIds: {
        11155111: '0x6b7f336e63428eE87be73c9DB3Ad9eFBF0DAd7e8',
        80001: '0x71782B79822001b88E717b991C95535a836391C2',
        97: '0xC734ca06CDAe04A3E0A78255DFbabB81665aa508',
        462: '0x710cCf9304597c75D879fF315BF093078ba30D9c'
    }
};
exports.default = Config;
