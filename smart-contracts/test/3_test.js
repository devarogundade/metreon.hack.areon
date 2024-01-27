const Beamre = artifacts.require('Beamre');
const MetreonPay = artifacts.require('MetreonPay');
const Metreon = artifacts.require('Metreon');
const MintableToken = artifacts.require('MintableToken');

contract('MetreonPay', async accounts => {
    // it('Pay Contract', async () => {
    //     const pay = await MetreonPay.deployed();

    //     const trx = await pay.deposit(Beamre.address, {
    //         value: "50000000000000000"
    //     });

    //     console.log(trx.tx);
    // });

    // it('Pay Contract', async () => {
    //     const pay = await MetreonPay.deployed();

    //     const bal = await pay.balanceOf(Beamre.address);

    //     console.log(bal);
    // });

});

contract('Beamre', async accounts => {
    // it('Set Contract', async () => {
    //     const beamre = await Beamre.deployed();

    //     const trx = await beamre.setContract(97, "0xe668a3983Aba80D2aAF3787a17BBEEE62F71DE43");

    //     console.log(trx.tx);
    // });

    // it('Set Contract', async () => {
    //     const beamre = await Beamre.deployed();

    //     const trx = await beamre.setContract(80001, "0x5Ad213b02Ee414C2EaBe004A61774207faC5113c");

    //     console.log(trx.tx);
    // });

    // it('Set Contract', async () => {
    //     const beamre = await Beamre.deployed();

    //     const trx = await beamre.setContract(462, "0x14cB760D6c62bf96D60E4C09FeB8f6DccBA5D762");

    //     console.log(trx.tx);
    // });

    // it('Token Approval', async () => {
    //     const token = await MintableToken.at("0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e");

    //     const trx = await token.approve(Beamre.address, "5000000000000000000000000000");

    //     console.log(trx.tx);
    // });

    // it('Token Bridge', async () => {
    //     const beamre = await Beamre.deployed();

    //     const trx = await beamre.bridgeToken(97, [
    //         { tokenId: "0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e", amount: "5000000000000000000" }
    //     ], "0xe7D634e1C16ef28cc6e9ff3201499fDC288A963E");

    //     console.log(trx.tx);
    // });

    // it("BNB Receive", async () => {
    //     const metreon = await Metreon.deployed();

    //     const message = {
    //         messageId: '0xdb417b55f296151ec8354691c59b058f05217e0607365adfa7725f25c9f04fad',
    //         fromChainId: 462,
    //         sender: '0xD892De3Be51b6Cc00194BDFA8bB6b8f503E0A4A9',
    //         payload: '0x00000000000000000000000060e0a0ead051314e7510ae803334a97f13e6ff21',
    //         tokens: [
    //             {
    //                 tokenId: '0x6Ad70B09ab3e4aB416F6D48D3F77Fbc2b07f0C0e',
    //                 amount: '5000000000000000000'
    //             }
    //         ],
    //         payMaster: 1,
    //     };

    //     const trx = await metreon.postMessage(
    //         "0x70527a5098443849069603C26815705436500565", message, "0xe7D634e1C16ef28cc6e9ff3201499fDC288A963E"
    //     );

    //     console.log(trx.tx);
    // });
});

