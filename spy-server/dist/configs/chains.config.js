"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config = {
    Mumbai: 80001,
    BnbTestnet: 97,
    AreonTestnet: 462,
    metreonIds: {
        80001: '0x3d269Ea3641fB768Ce7069BB9b73fccc880b9Da6',
        97: '0x8207EaE49615c6725646f998ba55Fcdcf859d447',
        462: '0x500C42d6390d64767A7e80905De8B75e82eb44f5'
    },
    rpcs: {
        80001: 'https://rpc.ankr.com/polygon_mumbai',
        97: 'https://data-seed-prebsc-1-s2.bnbchain.org:8545',
        462: 'https://testnet-rpc.areon.network'
    },
    wss: {
        462: 'wss://testnet-ws.areon.network'
    },
    tokenPoolIds: {
        80001: '0x8851e6DE291C1Be7acBAc56Bacd271b2c35CE9cE',
        97: '0x06E333dFADb83A8AF612f52A2A8C7A95B2C91D3c',
        462: '0x2214E7B27D352ae5cB38fcE0BA26fa2A85091f6b'
    }
};
exports.default = Config;
