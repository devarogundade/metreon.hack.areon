const Config = {
    Sepolia: 11155111,
    Mumbai: 80001,
    BnbTestnet: 97,
    AreonTestnet: 462,
    metreonIds: {
        11155111: '',
        80001: '0x626e574E9AE8860fF123458d4a38f1B9844FE9C1',
        97: '0x626e574E9AE8860fF123458d4a38f1B9844FE9C1',
        462: '0xC7Cd3F55b10b6385B9230BC4e8BF4f38010C13c6'
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
        11155111: '',
        80001: '0xEc61052fDaaE48fDF494e76B618F8072EAeC4a2A',
        97: '0xEc61052fDaaE48fDF494e76B618F8072EAeC4a2A',
        462: '0x0B15EA993C83e1Aa177eBFe7EbD2F5253e3859A5'
    }
};

export default Config;