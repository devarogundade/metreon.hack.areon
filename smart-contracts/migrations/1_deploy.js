const MetreonPay = artifacts.require('MetreonPay');
const MetreonConfig = artifacts.require('MetreonConfig');
const TokenPool = artifacts.require('TokenPool');

module.exports = async function (deployer, network, accounts) {
    // return;
    await deployer.deploy(MetreonConfig);
    await deployer.deploy(TokenPool, MetreonConfig.address);
    await deployer.deploy(MetreonPay);
};