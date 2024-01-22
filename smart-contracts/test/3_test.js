const Metreon = artifacts.require('Metreon');

contract('Metreon', async accounts => {
    it('Send Message', async () => {
        const metreon = await Metreon.deployed();

        const trx = await metreon.sendMessage({
            toChainId: 462,
            receiver: '0x9f60147b080d03A7eFcaA51D5a002f6e28DDD619',
            payload: "0x00",
            tokens: [],
            payMaster: 0
        }, {
            value: "640000000000000"
        });

        console.log(trx.tx);
    });
});