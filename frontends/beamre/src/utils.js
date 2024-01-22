const Utils = {
    chains: function () {
        return [
            { id: 97, name: "BSC Testnet", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-testnet.public.blastapi.io", coin: "Binance Smart Chain", scan: 'https://testnet.bscscan.com' },
            { id: 80001, name: "Mumbai", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "Polygon", scan: 'https://mumbai.polygonscan.com' },
            { id: 462, name: "Areon", image: "/images/areon.png", symbol: "AREA", chainHexId: "0x1CE", rpc: "https://testnet-rpc.areon.network", coin: "TAREA", scan: 'https://areonscan.com' },
        ];
    },
    otherChains: function () {
        return [
            { id: 97, name: "BSC Testnet", image: "/images/bsc.png", symbol: "BNB", chainHexId: "0x61", rpc: "https://bsc-testnet.public.blastapi.io", coin: "Binance Smart Chain", scan: 'https://testnet.bscscan.com' },
            { id: 80001, name: "Mumbai", image: "/images/polygon.png", symbol: "MATIC", chainHexId: "0x13881", rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public", coin: "Polygon", scan: 'https://mumbai.polygonscan.com' },
        ];
    },
    chain: function (id) {
        return this.chains().find(chain => chain.id == id);
    },
    currencies: function () {
        return [
            // usdt
            { id: 1, code: 1, chain: 97, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x664698266Ba332Cb2D30D9FE4f8461577c8119Af' },
            { id: 2, code: 1, chain: 80001, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x1b6c979548033dFfC88cEe698c9d3E83c3b0669d' },
            { id: 3, code: 1, chain: 462, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73' },

            // usdc
            { id: 4, code: 2, chain: 97, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x2C7EBAAAE211B1CD646e982Dd4E2cC2079B8BF21' },
            { id: 5, code: 2, chain: 80001, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0xc189e0F0cDC4023B392874f4a1B2797b44f21fe0' },
            { id: 6, code: 2, chain: 462, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1' },

            // area
            { id: 7, code: 3, chain: 97, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0x74E993319384BE2bB2f7a3D3e7477d85313EF54B' },
            { id: 8, code: 3, chain: 80001, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0x1d9B28e3ceC5e50A62F6a1512d2aD1252892e078' },
            { id: 9, code: 3, chain: 462, name: "Areon", symbol: "AREA", image: "/images/areon.png", address: '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1' },

            // bnb
            { id: 10, code: 4, chain: 97, name: "BNB", symbol: "BNB", image: "/images/bsc.png", address: '0x74E993319384BE2bB2f7a3D3e7477d85313EF54B' },
            { id: 11, code: 4, chain: 462, name: "Wrapped BNB", symbol: "WBNB", image: "/images/bsc.png", address: '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1' },

            // bnb
            { id: 12, code: 5, chain: 80001, name: "Polygon", symbol: "MATIC", image: "/images/polygon.png", address: '0x74E993319384BE2bB2f7a3D3e7477d85313EF54B' },
            { id: 13, code: 5, chain: 462, name: "Wrapped Polygon", symbol: "WMATIC", image: "/images/polugon.png", address: '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1' },
        ];
    },
    currenciesLP: function (id) {
        return this.currencies().find(currency => currency.id == id);
    },
    currenciesCN: function (chainId) {
        return this.currencies().filter(currency => currency.chain == chainId);
    },
    exactCurrency: function (chainId, code) {
        return this.currencies().filter(currency =>
            currency.chain == chainId &&
            currency.code == code
        )[0];
    },
    currencyAddress: function (address) {
        return this.currencies().find(currency => currency.address.toLowerCase() == address.toLowerCase());
    },
    supernovaIds: function () {
        return {
            462: '0x1b6c979548033dFfC88cEe698c9d3E83c3b0669d',
            97: '0x7dBd5B60c272cf5a712412259F7765C147F1cF26',
            80001: '0x9D35Cb69932f465064C9C73adB0a47e4062016fa',
        };
    },
    toDate: function (timestamp) {
        var a = new Date(timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        return {
            month: month,
            date: date,
            hour: hour,
            min: min
        };
    }
};

export default Utils;