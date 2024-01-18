const MetreonPay = artifacts.require('MetreonPay');
const MetreonConfig = artifacts.require('MetreonConfig');
const TokenPool = artifacts.require('TokenPool');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(TokenPool);
    await deployer.deploy(MetreonConfig);
    await deployer.deploy(MetreonPay);
};