const MetreonConfig = artifacts.require('MetreonConfig');

const AreonTokens = {
    'USDT': '0x3d269Ea3641fB768Ce7069BB9b73fccc880b9Da6',
    'USDC': '0xd331af3CB5894A90C328eF4F527a032b53a5D8bE',
    'WBNB': '0xE1a3C9201ffFc2b4333A80165C4b0dcef715224a',
    'WMATIC': '0x5c5e5A1E1eb69C2A271a5576c807B2eB5b6fD982',
    'AREA': '0x0000000000000000000000000000000000000000'
};

const MumbaiTokens = {
    'USDT': '0xB8E8eA64b90757bdBECf52Da42a62EC19d5D3309',
    'USDC': '0xD0D9E5fb25a93Fcda3F64552A3a384Ec8B12e2B3',
    'WAREA': '0xC7Cd3F55b10b6385B9230BC4e8BF4f38010C13c6',
    'MATIC': '0x0000000000000000000000000000000000000000'
};

const BscTokens = {
    'USDT': '0xB8E8eA64b90757bdBECf52Da42a62EC19d5D3309',
    'USDC': '0xD0D9E5fb25a93Fcda3F64552A3a384Ec8B12e2B3',
    'WAREA': '0xC7Cd3F55b10b6385B9230BC4e8BF4f38010C13c6',
    'BNB': '0x0000000000000000000000000000000000000000'
};

contract('MetreonConfig', async accounts => {

    // ========= Areon ========= //

    // it('Set Chain Token Ids Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setChainTokenId(97, BscTokens.USDT, AreonTokens.USDT);
    //     const trx1 = await config.setChainTokenId(97, BscTokens.USDC, AreonTokens.USDC);
    //     const trx2 = await config.setChainTokenId(97, BscTokens.BNB, AreonTokens.WBNB);
    //     const trx3 = await config.setChainTokenId(97, BscTokens.WAREA, AreonTokens.AREA);

    //     const trx4 = await config.setChainTokenId(80001, MumbaiTokens.USDT, AreonTokens.USDT);
    //     const trx5 = await config.setChainTokenId(80001, MumbaiTokens.USDC, AreonTokens.USDC);
    //     const trx6 = await config.setChainTokenId(80001, MumbaiTokens.MATIC, AreonTokens.WMATIC);
    //     const trx7 = await config.setChainTokenId(80001, MumbaiTokens.WAREA, AreonTokens.AREA);

    //     console.log(trx.tx);
    //     console.log(trx1.tx);
    //     console.log(trx2.tx);
    //     console.log(trx3.tx);

    //     console.log(trx4.tx);
    //     console.log(trx5.tx);
    //     console.log(trx6.tx);
    //     console.log(trx7.tx);
    // });

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