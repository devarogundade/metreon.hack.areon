const MintableToken = artifacts.require('MintableToken');

module.exports = async function (deployer, network, accounts) {
    // return;
    await deployer.deploy(MintableToken, "Tether USD", "USDT");
    await deployer.deploy(MintableToken, "Circle USD", "USDC");

    if (network != "areonTestnet") {
        await deployer.deploy(MintableToken, "Wrapped Areon", "WAREA");
    } else {
        await deployer.deploy(MintableToken, "Wrapped BNB", "WBNB");
        await deployer.deploy(MintableToken, "Wrapped Polygon", "WMATIC");
    }
};