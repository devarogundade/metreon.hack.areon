const Beamre = artifacts.require('Beamre');
const MetreonPay = artifacts.require('MetreonPay');
const MintableToken = artifacts.require('MintableToken');

contract('MetreonPay', async accounts => {
    it('Pay Contract', async () => {
        const pay = await MetreonPay.deployed();

        const trx = await pay.deposit(Beamre.address, {
            value: "50000000000000000"
        });

        console.log(trx.tx);
    });

    // it('Pay Contract', async () => {
    //     const pay = await MetreonPay.deployed();

    //     const bal = await pay.balanceOf(Beamre.address);

    //     console.log(bal);
    // });
});

contract('Beamre', async accounts => {
    // it('Set Contract', async () => {
    //     const beamre = await Beamre.deployed();

    //     const trx = await beamre.setContract(97, "0x345B1459B1115Fa2428246B2f3C3207F643A5bbE");

    //     console.log(trx.tx);
    // });

    it('Token Approval', async () => {
        const token = await MintableToken.at("0x85A637834544Fc824a4A2106Dbd88a586C55b6cf");

        const trx = await token.approve("0xd7B3f89f7eF2eeDFFde3Fe033439878417ddd470", "5000000000000000000000000000");

        console.log(trx.tx);
    });

    it('Token Bridge', async () => {
        const beamre = await Beamre.at("0xd7B3f89f7eF2eeDFFde3Fe033439878417ddd470");

        const trx = await beamre.bridgeToken(97, [
            { tokenId: "0x85A637834544Fc824a4A2106Dbd88a586C55b6cf", amount: "5000000000000000000" }
        ]);

        console.log(trx.tx);
    });
});

