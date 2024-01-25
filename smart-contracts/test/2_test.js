const MetreonConfig = artifacts.require('MetreonConfig');

const AreonTokens = {
    'USDT': '0x85A637834544Fc824a4A2106Dbd88a586C55b6cf',
    'USDC': '0x15E6Ab3269a6D89Ea685714Cc565BfC833c14284',
    'WBNB': '0x37D9e2f7E32e57d5590De149a04F49a5964b6FF1',
    'WMATIC': '0x10c980C92962c835E21F0A5B33042E5104B0Bba1',
    'AREA': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
};

const MumbaiTokens = {
    'USDT': '0xB8E8eA64b90757bdBECf52Da42a62EC19d5D3309',
    'USDC': '0xD0D9E5fb25a93Fcda3F64552A3a384Ec8B12e2B3',
    'WAREA': '0xC7Cd3F55b10b6385B9230BC4e8BF4f38010C13c6',
    'MATIC': '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
};

const BscTokens = {
    'USDT': '0xd15E42aeF1E2Fb06233B31Ae7E40d3f92cfEa945',
    'USDC': '0x51b04D3F7CcA027089eD0f277318048928a577A0',
    'WAREA': '0x13DCE922Ee45FcA54BC8526A1342334A1d3BdB09',
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