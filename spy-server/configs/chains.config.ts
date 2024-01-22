const Config = {
    Mumbai: 80001,
    BnbTestnet: 97,
    AreonTestnet: 462,
    metreonIds: {
        80001: '0xC981880C219a5bE49cAb1E02112597B76c4608b5',
        97: '0xC981880C219a5bE49cAb1E02112597B76c4608b5',
        462: '0x8851e6DE291C1Be7acBAc56Bacd271b2c35CE9cE'
    },
    rpcs: {
        80001: 'https://rpc.ankr.com/polygon_mumbai',
        97: 'https://bsc-testnet.public.blastapi.io',
        462: 'https://testnet-rpc.areon.network'
    },
    wss: {
        462: 'wss://testnet-ws.areon.network'
    },
    tokenPoolIds: {
        80001: '0x1569945c68b1a4556Af0072F5d86A4F62F701743',
        97: '0x1569945c68b1a4556Af0072F5d86A4F62F701743',
        462: '0x39c8c528246548ac3012123013C53ccD441e06fC'
    }
};

export default Config;