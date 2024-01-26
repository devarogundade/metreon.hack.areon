const Beamre = artifacts.require('Beamre');
const Metreon = artifacts.require('Metreon');
const MetreonConfig = artifacts.require('MetreonConfig');

module.exports = async function (deployer, network, accounts) {
    return;
    await deployer.deploy(Beamre, MetreonConfig.address, Metreon.address);
};