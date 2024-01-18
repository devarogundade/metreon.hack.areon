const Metreon = artifacts.require('Metreon');
const MetreonPay = artifacts.require('MetreonPay');
const MetreonConfig = artifacts.require('MetreonConfig');
const TokenPool = artifacts.require('TokenPool');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(Metreon, MetreonPay.address, MetreonConfig.address, TokenPool.address);
};