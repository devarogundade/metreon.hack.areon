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
            { id: 1, code: 1, chain: 97, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0xd15E42aeF1E2Fb06233B31Ae7E40d3f92cfEa945' },
            { id: 2, code: 1, chain: 80001, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '' },
            { id: 3, code: 1, chain: 462, name: "Tether USD", symbol: "USDT", image: "/images/usdt.png", address: '0x85A637834544Fc824a4A2106Dbd88a586C55b6cf' },

            // usdc
            { id: 4, code: 2, chain: 97, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x51b04D3F7CcA027089eD0f277318048928a577A0' },
            { id: 5, code: 2, chain: 80001, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '' },
            { id: 6, code: 2, chain: 462, name: "Circle USD", symbol: "USDC", image: "/images/usdc.png", address: '0x15E6Ab3269a6D89Ea685714Cc565BfC833c14284' },

            // area
            { id: 7, code: 3, chain: 97, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '0x13DCE922Ee45FcA54BC8526A1342334A1d3BdB09' },
            { id: 8, code: 3, chain: 80001, name: "Wrapped Areon", symbol: "WAREA", image: "/images/areon.png", address: '' },
            { id: 9, code: 3, chain: 462, name: "Areon", symbol: "AREA", image: "/images/areon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },

            // bnb
            { id: 10, code: 4, chain: 97, name: "BNB", symbol: "BNB", image: "/images/bsc.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
            { id: 11, code: 4, chain: 462, name: "Wrapped BNB", symbol: "WBNB", image: "/images/bsc.png", address: '0x37D9e2f7E32e57d5590De149a04F49a5964b6FF1' },

            // matic
            { id: 12, code: 5, chain: 80001, name: "Polygon", symbol: "MATIC", image: "/images/polygon.png", address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', isNative: true },
            { id: 13, code: 5, chain: 462, name: "Wrapped Polygon", symbol: "WMATIC", image: "/images/polugon.png", address: '0x10c980C92962c835E21F0A5B33042E5104B0Bba1' },
        ];
    },
    currenciesLP: function (id) {
        return this.currencies().find(currency => currency.id == id);
    },
    currenciesCN: function (chainId) {
        return this.currencies().filter(currency => currency.chain == chainId);
    },
    exactCurrency: function (chainId, code) {
        return this.currencies().filter(currency => currency.chain == chainId && currency.code == code)[0];
    },
    currencyAddress: function (address) {
        return this.currencies().find(currency => currency.address.toLowerCase() == address.toLowerCase());
    },
    beamreIds: function () {
        return {
            462: '0xd7B3f89f7eF2eeDFFde3Fe033439878417ddd470',
            97: '0x345B1459B1115Fa2428246B2f3C3207F643A5bbE',
            80001: '',
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