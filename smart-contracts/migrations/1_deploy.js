const MetreonPay = artifacts.require('MetreonPay');
const MetreonConfig = artifacts.require('MetreonConfig');

module.exports = async function (deployer, network, accounts) {
    return;
    await deployer.deploy(MetreonConfig);
    await deployer.deploy(MetreonPay);
};