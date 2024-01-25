/* eslint-disable no-undef */
import Web3 from 'web3';
import erc20 from '../contracts/erc20.json';
import Utils from '../utils';
import Converter from './converter';

export async function mintForEvm(chainId) {
    try {
        const web3 = new Web3(ethereum);

        const accounts = await ethereum.enable();

        const usdt = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, 1).address));
        const usdc = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, 2).address));

        await usdt.methods.mint(Converter.toWei('50')).send({ from: accounts[0] });
        await usdc.methods.mint(Converter.toWei('50')).send({ from: accounts[0] });

        if (chainId == 462) {
            const wBnb = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, 4).address));
            const wMatic = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, 5).address));

            await wBnb.methods.mint(Converter.toWei('50')).send({ from: accounts[0] });
            await wMatic.methods.mint(Converter.toWei('50')).send({ from: accounts[0] });
        } else {
            const wAreon = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, 3).address));

            await wAreon.methods.mint(Converter.toWei('50')).send({ from: accounts[0] });
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}