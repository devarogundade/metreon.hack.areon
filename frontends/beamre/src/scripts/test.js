/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Contract, Wallet, Provider } from 'fuels'
import swayCallFuelABI from '../contracts/swaycall-fuel.json'
import supernovaFuelABI from '../contracts/supernova-fuel.json'
import configFuelABI from '../contracts/config-fuel.json'
import payFuelABI from '../contracts/pay-fuel.json'
import tokenFuelABI from '../contracts/token-fuel.json'

import Web3 from 'web3'
import Utils from '../utils'

const privateKey = '7b99af86578bebed4cadf5497713c6d732ecf72073f06be1f4f1a8da8c3b9b89'
const provider = new Provider('https://beta-3.fuel.network/graphql')

const wallet = Wallet.fromPrivateKey(privateKey)
wallet.connect(provider)

const supernova = Utils.supernovaIds()[0]

// test
const swaycall = '0x46266fe5b27cb7feb5dafcec833b375c6c31f57fd388c86448c82ca2a3eac01c'
const config = '0xb5a0816087f9b9d54218adc8c1f07db9c96684bd49e9ac8ac2fdb86d431b4b28'
const pay = '0x9f1f6b8d174f9c03812890bdf2aad88fc8509b3b64eaf01c81c022e6781cef28'

export async function initCall() {
    const instance = new Contract(swaycall, swayCallFuelABI, wallet)

    try {
        const result = await instance.functions.initialize(config, pay)
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function initNova() {
    const instance = new Contract(supernova, supernovaFuelABI, wallet)

    try {
        const result = await instance.functions.initialize(swaycall, pay)
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


export async function initPay() {
    const instance = new Contract(pay, payFuelABI, wallet)

    try {
        const result = await instance.functions.initialize(config)
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


export async function addChain() {
    const instance = new Contract(supernova, supernovaFuelABI, wallet)
    const web3 = new Web3(ethereum)

    try {
        const result = await instance.multiCall([
            instance.functions.add_dest_chain(11155111, web3.utils.padLeft(Utils.supernovaIds()[11155111], 64)),
            instance.functions.add_dest_chain(97, web3.utils.padLeft(Utils.supernovaIds()[97], 64)),
            instance.functions.add_dest_chain(80001, web3.utils.padLeft(Utils.supernovaIds()[80001], 64)),
        ])
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function addPair() {
    const web3 = new Web3(ethereum)
    const instance = new Contract(supernova, supernovaFuelABI, wallet)
    try {
        const result = await instance.multiCall([
            instance.functions.add_pair(
                web3.utils.padLeft("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", 64),
                '0x0000000000000000000000000000000000000000000000000000000000000000'
            ),
            instance.functions.add_pair(
                web3.utils.padLeft("0x92904fb980C20474567aedB02E0cc20A1259F0E5", 64),
                '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
            ),
            instance.functions.add_pair(
                web3.utils.padLeft("0x07a35276Dc26366Bb15D8E26cA0e7f1449B8fA00", 64),
                '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
            ),
            instance.functions.add_pair(
                web3.utils.padLeft("0xB699B29F10c293f2b8E56d0df7E282bBB3A9378f", 64),
                '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
            ),
            //
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0x664698266Ba332Cb2D30D9FE4f8461577c8119Af", 64),
            //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
            // ),
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0x2C7EBAAAE211B1CD646e982Dd4E2cC2079B8BF21", 64),
            //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
            // ),
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0x74E993319384BE2bB2f7a3D3e7477d85313EF54B", 64),
            //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
            // ),
            //
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0x1b6c979548033dFfC88cEe698c9d3E83c3b0669d", 64),
            //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
            // ),
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0xc189e0F0cDC4023B392874f4a1B2797b44f21fe0", 64),
            //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
            // ),
            // instance.functions.add_pair(
            //     web3.utils.padLeft("0x1d9B28e3ceC5e50A62F6a1512d2aD1252892e078", 64),
            //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
            // )
        ])
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function fund() {
    const instance = new Contract(supernova, supernovaFuelABI, wallet)

    // instance.functions.add_pair(
    //     web3.utils.padLeft("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", 64),
    //     '0x0000000000000000000000000000000000000000000000000000000000000000'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x92904fb980C20474567aedB02E0cc20A1259F0E5", 64),
    //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x07a35276Dc26366Bb15D8E26cA0e7f1449B8fA00", 64),
    //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0xB699B29F10c293f2b8E56d0df7E282bBB3A9378f", 64),
    //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
    // ),
    // //
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x664698266Ba332Cb2D30D9FE4f8461577c8119Af", 64),
    //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x2C7EBAAAE211B1CD646e982Dd4E2cC2079B8BF21", 64),
    //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x74E993319384BE2bB2f7a3D3e7477d85313EF54B", 64),
    //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
    // ),
    // //
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x1b6c979548033dFfC88cEe698c9d3E83c3b0669d", 64),
    //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0xc189e0F0cDC4023B392874f4a1B2797b44f21fe0", 64),
    //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x1d9B28e3ceC5e50A62F6a1512d2aD1252892e078", 64),
    //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
    // )

    try {
        const result = await instance.functions.fund()
            .txParams({ gasPrice: 1 })
            .callParams({
                forward: [500_000_000, '0x0000000000000000000000000000000000000000000000000000000000000000'],
            })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


export async function setPrice() {
    const instance0 = new Contract(config, configFuelABI, wallet)

    try {
        const result = await instance0.multiCall([
            // instance0.functions.update_fee(11155111, '1100000'),
            instance0.functions.update_fee(11155111, '1500'),
            // instance0.functions.update_fee(97, '540000'),
            instance0.functions.update_fee(97, '1000'),
            // instance0.functions.update_fee(80001, '27000'),
            instance0.functions.update_fee(80001, '270')
        ])
            .txParams({ gasPrice: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function faucet(contractId) {
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x704c803cFdC9B3866da127A9459Bff294b9c8FA6", 64),
    //     '0x96b77ce29b4b442be029f09df33258e2b513909c5086da08c4675e0a39deeb73'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0xe92Cc3de1c70e3Dd0cF92ecDCBF950365D552dF7", 64),
    //     '0xd6738e50fb344eff04b9ee5890c5faa4cef831c7c61216a3be3c8eebc39ff8c1'
    // ),
    // instance.functions.add_pair(
    //     web3.utils.padLeft("0x78ffC99AdEf151b88E74bD2456958BFb76d905f6", 64),
    //     '0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1'
    // )

    const contract = new Contract('0x3abf11c2ff4e6b90369bae40e67e6292aba81034a53017639b8f2dcfcac739f1', tokenFuelABI, wallet)

    try {
        const result = await contract.functions.mint(100_000_000_000_000)
            .txParams({ gasPrice: 1, variableOutputs: 1 })
            .call()
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


export async function execute() {
    const contract = new Contract(swaycall, swayCallFuelABI, wallet)

    const c = new Contract(config, configFuelABI, wallet)
    const a = new Contract("0x670d403210d1705e12d3a29d08b0a7c000e0d1cff5bfdd4492427ecf2be3fac5", supernovaFuelABI, wallet)
    const p = new Contract(pay, payFuelABI, wallet)

    const payload = {
        nonce: '1690890135',
        fromChainId: 80001,
        fromContractId: '0x0000000000000000000000009d35cb69932f465064c9c73adb0a47e4062016fa',
        destChainId: '0',
        destContractId: '0x670d403210d1705e12d3a29d08b0a7c000e0d1cff5bfdd4492427ecf2be3fac5',
        bridgeFee: '71000000000000000',
        data: {
            slot0U32: '0',
            slot1U32: '0',
            slot0U64: '100000000000',
            slot1U64: '0',
            slot2U64: '0',
            slot0B256: '0x0000000000000000000000001b6c979548033dffc88cee698c9d3e83c3b0669d',
            slot1B256: '0xdf3e3c6190799e6cf69560d10f7d69eb79df6a53668dea06c2eb36e7123c37c7',
            slot2B256: '0x0000000000000000000000000000000000000000000000000000000000000000',
            slot3B256: '0x0000000000000000000000000000000000000000000000000000000000000000'
        }
    }

    try {
        const { transactionId } = await contract.functions.sway_execute(payload)
            .txParams({ gasPrice: 1, variableOutputs: 1 })
            .addContracts([c, a, p])
            .call()

        console.log(transactionId);

        return transactionId
    } catch (error) {
        console.error(error)
        return null
    }
}