/* eslint-disable no-undef */
import beamreABI from '../contracts/Beamre.json';
import Utils from '../utils';
import Web3 from 'web3';

export async function bridgeEVM(fromChain, toChain, currency, amount) {
    try {
        const web3 = new Web3(ethereum);

        const exactCurrency = Utils.exactCurrency(fromChain.id, currency.code);

        const accounts = await ethereum.enable();
        const beamre = new web3.eth.Contract(beamreABI.abi, Utils.beamreIds()[fromChain.id]);

        const { transactionHash } = await beamre.methods.bridgeToken(
            toChain.id,
            [{ tokenId: exactCurrency.address, amount: amount }],
            Utils.tokenPools()[fromChain.id]
        ).send({
            from: accounts[0],
            value: exactCurrency.isNative ? amount : 0
        });

        return transactionHash;
    } catch (error) {
        console.error(error);
        return null;
    }
}