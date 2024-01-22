/* eslint-disable no-undef */
import appEvmAbi from '../contracts/swaycallapp-evm.json'
import payEvmAbi from '../contracts/swaycallpay-evm.json'

import appFuelAbi from '../contracts/swaycallapp-fuel.json'
import payFuelAbi from '../contracts/swaycallpay-fuel.json'

import { Contract, Address, NativeAssetId } from 'fuels'
import Utils from '../utils'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'

export async function findApp(contractId, chain) {
    if (chain.category == "EVM") {
        try {
            const web3 = new Web3(chain.rpc)

            // eslint-disable-next-line no-undef
            const accounts = await ethereum.enable()
            const contract = new web3.eth.Contract(appEvmAbi.abi, contractId)

            const feePayer = await contract._methods.feePayer().call()
            const feeIdentifier = await contract._methods.feeIdentifier().call()

            return {
                status: 'ok',
                isOwner: feePayer.toLowerCase() == accounts[0].toLowerCase(),
                name: feeIdentifier,
                contractId: contractId
            }
        } catch (error) {
            console.error(error)
            return {
                status: 'error',
                data: error
            }
        }
    } else {
        try {
            const accounts = await fuel.accounts()
            const wallet = await fuel.getWallet(accounts[0]);
            const b256 = new Address(accounts[0]).toHexString();

            const contract = new Contract(contractId, appFuelAbi, wallet)

            const { value: feePayer } = await contract.functions.fee_payer().get()
            const { value: feeIdentifier } = await contract.functions.fee_identifier().get()

            console.log(feePayer.value);
            
            return {
                status: 'ok',
                isOwner: feePayer.value.toLowerCase() == b256.toLowerCase(),
                name: feeIdentifier,
                contractId: contractId
            }
        } catch (error) {
            console.error(error)
            return {
                status: 'error',
                data: error
            }
        }
    }
}

export async function addApp(contractId, chain, name, image) {
    if (chain.category == "EVM") {
        try {
            const web3 = new Web3(ethereum)

            // eslint-disable-next-line no-undef
            const accounts = await ethereum.enable()
            const contract = new web3.eth.Contract(payEvmAbi.abi, Utils.swaycallpayIds()[chain.id])
            
            const hash = await contract._methods.addApp(contractId).send({ from: accounts[0] })

            saveAppContract(contractId, chain.id, name, image)

            return hash
        } catch (error) {
            console.error(error)
            return null
        }
    } else {
        try {
            const accounts = await fuel.accounts()
            const wallet = await fuel.getWallet(accounts[0])

            const contract = new Contract(Utils.swaycallpayIds()[chain.id], payFuelAbi, wallet)
            const app = new Contract(contractId, appFuelAbi, wallet)

            const { transactionId: hash } = await contract.functions.add_app(contractId)
                .addContracts([app])
                .call()

            saveAppContract(contractId, chain.id, name, image)

            return hash
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

function saveAppContract(contractId, chainId, name, image) {
    const contract = { contractId: contractId, chainId: chainId, name: name, image: image }
    let apps = localStorage.getItem('apps')
    if (!apps) { apps = [] }
    else { apps = JSON.parse(apps) }
    apps.push(contract)
    apps = JSON.stringify(apps)
    localStorage.setItem('apps', apps)
}

function getSavedContracts() {
    let apps = localStorage.getItem('apps')
    if (!apps) { return [] }
    return JSON.parse(apps)
}

export async function getApps() {
    let apps = []
    let contracts = getSavedContracts()
    for (let index = 0; index < contracts.length; index++) {
        let app = await getAppFromContractId(
            contracts[index].contractId,
            contracts[index].chainId
        )
        app.local = contracts[index]
        apps.push(app)
    }
    return apps
}

async function getAppFromContractId(contractId, chainId) {
    const chain = Utils.chain(chainId)

    if (chain.category == "EVM") {
        try {
            const web3 = new Web3(chain.rpc)
            const contract = new web3.eth.Contract(payEvmAbi.abi, Utils.swaycallpayIds()[chain.id])

            return await contract._methods.app(contractId).call()
        } catch (error) {
            console.error(error)
            return null
        }
    } else {
        try {
            const accounts = await fuel.accounts()
            const wallet = await fuel.getWallet(accounts[0]);

            const contract = new Contract(Utils.swaycallpayIds()[chainId], payFuelAbi, wallet)

            const { value: app } = await contract.functions.app(contractId).get()

            let newApp = app

            newApp.balance = Number(new BigNumber(app.balance).toString()) * 1_000_000_000
            newApp.spent = Number(new BigNumber(app.spent).toString()) * 1_000_000_000

            return newApp
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export async function fundApp(contractId, chain, amount) {
    if (chain.category == "EVM") {
        const web3 = new Web3(ethereum)
        try {
            // eslint-disable-next-line no-undef
            const accounts = await ethereum.enable()
            const contract = new web3.eth.Contract(payEvmAbi.abi, Utils.swaycallpayIds()[chain.id])

            const hash = await contract._methods.deposit(contractId).send({
                value: amount,
                from: accounts[0]
            })

            return hash
        } catch (error) {
            console.error(error)
            return null
        }
    } else {
        const accounts = await fuel.accounts()
        const wallet = await fuel.getWallet(accounts[0]);

        const contract = new Contract(Utils.swaycallpayIds()[chain.id], payFuelAbi, wallet)

        try {
            const { transactionId: hash } = await contract.functions.deposit(contractId)
                .txParams({
                    gasPrice: 1,
                    variableOutputs: 1
                })
                .callParams({
                    forward: [(amount / 1_000_000_000), NativeAssetId],
                })
                .call()
        
            return hash
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export async function withdrawFromApp(contractId, chain, amount) {
    if (chain.category == "EVM") {
        const web3 = new Web3(ethereum)
        try {
            // eslint-disable-next-line no-undef
            const accounts = await ethereum.enable()
            const contract = new web3.eth.Contract(payEvmAbi.abi, Utils.swaycallpayIds()[chain.id])

            const hash = await contract._methods.withdraw(amount, contractId).send({
                from: accounts[0]
            })

            return hash
        } catch (error) {
            console.error(error)
            return null
        }
    } else {
        const accounts = await fuel.accounts()
        const wallet = await fuel.getWallet(accounts[0]);

        const contract = new Contract(Utils.swaycallpayIds()[chain.id], payFuelAbi, wallet)

        try {
            const { transactionId: hash } = await contract.functions.withdraw(amount, contractId)
                .txParams({
                    gasPrice: 1,
                    variableOutputs: 1
                })
                .call()

            return hash
        } catch (error) {
            console.error(error);
            return null
        }
    }

}