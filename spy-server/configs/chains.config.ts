const Config = {
    Mumbai: 80001,
    BnbTestnet: 97,
    AreonTestnet: 462,
    metreonIds: {
        80001: '',
        97: '0x2810127091972FccEaCdA109876268Cf47D48935',
        462: '0x7d2B716b9728C2cb03d44aB2e1b7f83ddb24e6c1'
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
        80001: '',
        97: '0xe7D634e1C16ef28cc6e9ff3201499fDC288A963E',
        462: '0x77dC42C576a9f2BEA54cAf996333C87b62aac9F1'
    }
};

export default Config;