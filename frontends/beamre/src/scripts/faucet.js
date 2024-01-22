/* eslint-disable no-undef */
import Web3 from 'web3'
import erc20 from '../contracts/erc20.json'
import tokenFuelABI from '../contracts/token-fuel.json'
import { Contract } from 'fuels'
import Utils from '../utils'
import Converter from './converter'

export async function mintForFuel() {
    try {
        const accounts = await fuel.accounts()
        const wallet = await fuel.getWallet(accounts[0]);

        const btc = new Contract(Utils.exactCurrency(0, "BTC").address, tokenFuelABI, wallet)
        const usdt = new Contract(Utils.exactCurrency(0, "USDT").address, tokenFuelABI, wallet)
        const usdc = new Contract(Utils.exactCurrency(0, "USDT").address, tokenFuelABI, wallet)

        await btc.functions.mint(400_000_000).txParams({ gasPrice: 1, variableOutputs: 1 })
            .call()

        await usdt.functions.mint(50_000_000_000).txParams({ gasPrice: 1, variableOutputs: 1 })
            .call()

        await usdc.functions.mint(50_000_000_000).txParams({ gasPrice: 1, variableOutputs: 1 })
            .call()

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function mintForEvm(chainId) {
    try {
        const web3 = new Web3(ethereum)

        const accounts = await ethereum.enable()

        const btc = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, "BTC").address));
        const usdt = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, "USDT").address));
        const usdc = new web3.eth.Contract(erc20.abi, (Utils.exactCurrency(chainId, "USDC").address));

        await btc._methods.mint(Converter.toWei('0.4')).send({ from: accounts[0] })
        await usdt._methods.mint(Converter.toWei('50')).send({ from: accounts[0] })
        await usdc._methods.mint(Converter.toWei('50')).send({ from: accounts[0] })

        return true
    } catch (error) {
        console.error(error);
        return false
    }
}