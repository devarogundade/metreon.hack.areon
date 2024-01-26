/* eslint-disable no-undef */
import receiverEvmABI from '../contracts/MetreonReceiver.json';
import payEvmABI from '../contracts/MetreonPay.json';

import Utils from '../utils';
import Web3 from 'web3';

export async function findApp(contractId, chain) {
    try {
        const web3 = new Web3(chain.rpc);

        // eslint-disable-next-line no-undef
        const accounts = await ethereum.enable();
        const receiver = new web3.eth.Contract(receiverEvmABI.abi, contractId);

        const payMaster = await receiver.methods.owner().call();

        return {
            status: 'ok',
            isOwner: payMaster.toLowerCase() == accounts[0].toLowerCase(),
            name: 'Metreon Receiver',
            contractId: contractId
        };
    } catch (error) {
        console.error(error);
        return {
            status: 'error',
            data: error
        };
    }
}

export async function addApp(contractId, chain, name, image) {
    try {

        saveAppContract(contractId, chain.id, name, image);

        return contractId;

    } catch (error) {
        console.error(error);
        return null;
    }
}

function saveAppContract(contractId, chainId, name, image) {
    const contract = { contractId: contractId, chainId: chainId, name: name, image: image };
    let apps = localStorage.getItem('apps');
    if (!apps) { apps = []; }
    else { apps = JSON.parse(apps); }
    apps.push(contract);
    apps = JSON.stringify(apps);
    localStorage.setItem('apps', apps);
}

function getSavedContracts() {
    let apps = localStorage.getItem('apps');
    if (!apps) { return []; }
    return JSON.parse(apps);
}

export async function getApps() {
    let apps = [];
    let contracts = getSavedContracts();
    for (let index = 0; index < contracts.length; index++) {
        let bal = await getAppBalFromContractId(
            contracts[index].contractId,
            contracts[index].chainId
        );

        const app = contracts[index];
        app.balance = bal;

        console.log(app);
        apps.push(app);
    }
    return apps;
}

async function getAppBalFromContractId(contractId, chainId) {
    const chain = Utils.chain(chainId);
    try {
        const web3 = new Web3(chain.rpc);
        const pay = new web3.eth.Contract(payEvmABI.abi, Utils.metreonPayIds()[chain.id]);

        return await pay.methods.balanceOf(contractId).call();
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function fundApp(contractId, chain, amount) {
    const web3 = new Web3(ethereum);
    try {
        // eslint-disable-next-line no-undef
        const accounts = await ethereum.enable();
        const pay = new web3.eth.Contract(payEvmABI.abi, Utils.metreonPayIds()[chain.id]);

        const hash = await pay.methods.deposit(contractId).send({
            value: amount,
            from: accounts[0]
        });

        return hash;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function withdrawFromApp(contractId, chain, amount) {
    const web3 = new Web3(ethereum);
    try {
        // eslint-disable-next-line no-undef
        const accounts = await ethereum.enable();
        const pay = new web3.eth.Contract(payEvmABI.abi, Utils.metreonPayIds()[chain.id]);

        const hash = await pay.methods.withdraw(contractId, amount).send({
            from: accounts[0]
        });

        return hash;
    } catch (error) {
        console.error(error);
        return null;
    }
}