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
    metreonPayIds: function () {
        return {
            97: '0x045e0fbBd0A123Ab28357b620eA04b48284c129e',
            80001: '',
            462: '0x4c073cadc2EB9Ad464CC1A9E6Edd93e38Cb07A96'
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