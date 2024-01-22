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
    //         "0x3d269Ea3641fB768Ce7069BB9b73fccc880b9Da6",
    //         "0xd331af3CB5894A90C328eF4F527a032b53a5D8bE",
    //         "0xE1a3C9201ffFc2b4333A80165C4b0dcef715224a",
    //         "0x5c5e5A1E1eb69C2A271a5576c807B2eB5b6fD982"
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

    // it('Set Supported Token Areon Testnet', async () => {
    //     const config = await MetreonConfig.deployed();

    //     const trx = await config.updateSupportedTokens([
    //         "0xB8E8eA64b90757bdBECf52Da42a62EC19d5D3309",
    //         "0xD0D9E5fb25a93Fcda3F64552A3a384Ec8B12e2B3",
    //         "0xC7Cd3F55b10b6385B9230BC4e8BF4f38010C13c6"
    //     ]);

    //     console.log(trx.tx);
    // });
});