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
    //         "0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e",
    //         "0x95a8ca97Eb9DB7dE25D0A8D2F5eea6AB5123d3c0",
    //         "0xE52Fe45e9a911198C95883C82e3580A9aadF0C7e",
    //         "0xA2c51C566875836874308FAAa86e37Ac4c19e545"
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
    //         "0xFE57951e4aA44B274e681678efcf2dFB9e9B34aA",
    //         "0x1cf6234A8aEE6Ec0B28Fac9Abdd2A9ddB15d0F85",
    //         "0x201761F8bA8bfF62345594Ee7cbc280Ae2DA19AC"
    //     ]);

    //     console.log(trx.tx);
    // });
});