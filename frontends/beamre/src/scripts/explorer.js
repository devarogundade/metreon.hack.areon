import axios from 'axios';
import Web3 from 'web3';

const endpoint = 'https://metreonhack.azurewebsites.net';

export async function fetchMessages(address, page) {
    try {
        const web3 = new Web3();
        const paddedAddress = web3.utils.padLeft(address, 64);
        const response = await axios.get(`${endpoint}/messages?page=${page}&query=${paddedAddress}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function fineHash(hash) {
    if (hash == '') return '- - - - -';
    if (hash.length < 20) return hash;
    return hash.substring(0, 20) + '...';
}