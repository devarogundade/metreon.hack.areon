const MetreonConfig = artifacts.require('MetreonConfig');

const AreonTokens = {
    'USDT': '0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e',
    'USDC': '0x95a8ca97Eb9DB7dE25D0A8D2F5eea6AB5123d3c0',
    'WBNB': '0xE52Fe45e9a911198C95883C82e3580A9aadF0C7e',
    'WMATIC': '0xA2c51C566875836874308FAAa86e37Ac4c19e545',
    'AREA': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
};

const MumbaiTokens = {
    'USDT': '0x9252C5aC33132959954b7e783A1043394Dd1b083',
    'USDC': '0x81297d0e83488A4eFC074041488bB4a9B5713a0E',
    'WAREA': '0xe61C27B23970D90Bb6A0425498D41cC990B8F517',
    'MATIC': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
};

const BscTokens = {
    'USDT': '0xFE57951e4aA44B274e681678efcf2dFB9e9B34aA',
    'USDC': '0x1cf6234A8aEE6Ec0B28Fac9Abdd2A9ddB15d0F85',
    'WAREA': '0x201761F8bA8bfF62345594Ee7cbc280Ae2DA19AC',
    'BNB': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
};

contract('MetreonConfig', async accounts => {

    // ========= Areon ========= //

    // it('Set Chain Token Ids Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setChainTokenId(97, BscTokens.USDT, AreonTokens.USDT);
    //     const trx1 = await config.setChainTokenId(97, BscTokens.USDC, AreonTokens.USDC);
    //     const trx2 = await config.setChainTokenId(97, BscTokens.BNB, AreonTokens.WBNB);
    //     const trx3 = await config.setChainTokenId(97, BscTokens.WAREA, AreonTokens.AREA);

    //     // const trx4 = await config.setChainTokenId(80001, MumbaiTokens.USDT, AreonTokens.USDT);
    //     // const trx5 = await config.setChainTokenId(80001, MumbaiTokens.USDC, AreonTokens.USDC);
    //     // const trx6 = await config.setChainTokenId(80001, MumbaiTokens.MATIC, AreonTokens.WMATIC);
    //     // const trx7 = await config.setChainTokenId(80001, MumbaiTokens.WAREA, AreonTokens.AREA);

    //     console.log(trx.tx);
    //     console.log(trx1.tx);
    //     console.log(trx2.tx);
    //     console.log(trx3.tx);

    //     // console.log(trx4.tx);
    //     // console.log(trx5.tx);
    //     // console.log(trx6.tx);
    //     // console.log(trx7.tx);
    // });

    // Matic //

    // it('Set Chain Token Ids Mumbai', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setChainTokenId(462, AreonTokens.USDT, MumbaiTokens.USDT);
    //     const trx1 = await config.setChainTokenId(462, AreonTokens.USDC, MumbaiTokens.USDC);
    //     const trx2 = await config.setChainTokenId(462, AreonTokens.WMATIC, MumbaiTokens.MATIC);
    //     const trx3 = await config.setChainTokenId(462, AreonTokens.AREA, MumbaiTokens.WAREA);


    //     console.log(trx.tx);
    //     console.log(trx1.tx);
    //     console.log(trx2.tx);
    //     console.log(trx3.tx);
    // });

    // ========= BSC ========= //

    // it('Set Chain Token Ids BSC', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setChainTokenId(462, AreonTokens.USDT, BscTokens.USDT);
    //     const trx1 = await config.setChainTokenId(462, AreonTokens.USDC, BscTokens.USDC);
    //     const trx2 = await config.setChainTokenId(462, AreonTokens.WBNB, BscTokens.BNB);
    //     const trx3 = await config.setChainTokenId(462, AreonTokens.AREA, BscTokens.WAREA);

    //     console.log(trx.tx);
    //     console.log(trx1.tx);
    //     console.log(trx2.tx);
    //     console.log(trx3.tx);
    // });
});