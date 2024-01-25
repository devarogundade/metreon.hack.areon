import axios from 'axios';

const endpoint = 'https://metreonhack.azurewebsites.net';

export async function fetchMessages(address, page) {
    try {
        const response = await axios.get(`${endpoint}/messages?page=${page}&payload=${address}`);
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