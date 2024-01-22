/* eslint-disable no-undef */
import evmAbi from '../contracts/supernova-evm.json'
import fuelAbi from '../contracts/supernova-fuel.json'
import { Contract, Address } from 'fuels'
import Utils from '../utils'
import Web3 from 'web3'

import swayCallFuelABI from '../contracts/swaycall-fuel.json'
import configFuelABI from '../contracts/config-fuel.json'
import payFuelABI from '../contracts/pay-fuel.json'

import { postStream } from './post'

export async function bridgeFUELVM(fromChain, destChain, currency, amount, receiver) {
    try {
        const web3 = new Web3(ethereum)

        const accounts = await fuel.accounts()
        const wallet = await fuel.getWallet(accounts[0]);

        let exactCurrency = Utils.exactCurrency(fromChain.id, currency.symbol)

        const contract = new Contract(Utils.supernovaIds()[fromChain.id], fuelAbi, wallet)

        const swaycall = '0x46266fe5b27cb7feb5dafcec833b375c6c31f57fd388c86448c82ca2a3eac01c'
        const config = '0xb5a0816087f9b9d54218adc8c1f07db9c96684bd49e9ac8ac2fdb86d431b4b28'
        const pay = '0x9f1f6b8d174f9c03812890bdf2aad88fc8509b3b64eaf01c81c022e6781cef28'

        const callContract = new Contract(swaycall, swayCallFuelABI, wallet)
        const configContract = new Contract(config, configFuelABI, wallet)
        const payContract = new Contract(pay, payFuelABI, wallet)

        const { transactionId, logs } = await contract.functions
            .bridge(destChain.id, web3.utils.padLeft(receiver, 64))
            .txParams({
                gasPrice: 1,
                variableOutputs: 1
            })
            .addContracts([callContract, configContract, payContract])
            .callParams({
                forward: [amount, exactCurrency.address],
            })
            .call()

        postStream(logs[1], transactionId)

        return transactionId
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function bridgeEVM(fromChain, destChain, currency, amount, receiver) {
    try {
        const web3 = new Web3(ethereum)

        let exactCurrency = Utils.exactCurrency(fromChain.id, currency.symbol)
        let hexReceiver = new Address(receiver).toHexString()

        const accounts = await ethereum.enable()
        const contract = new web3.eth.Contract(evmAbi.abi, Utils.supernovaIds()[fromChain.id])

        const { transactionHash } = await contract._methods.bridge(
            destChain.id,
            exactCurrency.address,
            !exactCurrency.isNative ? amount : 0,
            hexReceiver
        ).send({
            from: accounts[0],
            value: exactCurrency.isNative ? amount : 0
        })

        return transactionHash
    } catch (error) {
        console.error(error)
        return null
    }
}