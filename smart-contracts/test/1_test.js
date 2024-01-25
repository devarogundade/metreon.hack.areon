const MetreonConfig = artifacts.require('MetreonConfig');

contract('MetreonConfig', async accounts => {

    // ========= Areon ========= //

    // it('Set Fee Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setFee(97, '640000000000000');
    //     const trx1 = await config.setFee(80001, '50000000000000000');

    //     console.log(trx.tx);
    //     console.log(trx1.tx);
    // });

    // it('Set Supported Chains Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.updateSupportedChains([460, 97, 80001]);

    //     console.log(trx.tx);
    // });

    // it('Set Supported Token Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.updateSupportedTokens([
    //         "0x85A637834544Fc824a4A2106Dbd88a586C55b6cf",
    //         "0x15E6Ab3269a6D89Ea685714Cc565BfC833c14284",
    //         "0x37D9e2f7E32e57d5590De149a04F49a5964b6FF1",
    //         "0x10c980C92962c835E21F0A5B33042E5104B0Bba1"
    //     ]);

    //     console.log(trx.tx);
    // });



    // ========= BSC ========= //

    // it('Set Fee BSC Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.setFee(462, '640000000000000');

    //     console.log(trx.tx);
    // });

    // it('Set Supported Chains BSC Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.updateSupportedChains([462]);

    //     console.log(trx.tx);
    // });

    // it('Set Supported Token BSC Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.updateSupportedTokens([
    //         "0xd15E42aeF1E2Fb06233B31Ae7E40d3f92cfEa945",
    //         "0x51b04D3F7CcA027089eD0f277318048928a577A0",
    //         "0x13DCE922Ee45FcA54BC8526A1342334A1d3BdB09"
    //     ]);

    //     console.log(trx.tx);
    // });
});