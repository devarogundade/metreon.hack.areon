const Beamre = artifacts.require('Beamre');
const Metreon = artifacts.require('Metreon');

module.exports = async function (deployer, network, accounts) {
    // return;
    await deployer.deploy(Beamre, Metreon.address);
};