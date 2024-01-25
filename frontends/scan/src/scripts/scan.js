import axios from 'axios';

export async function fetchTransactions(page = 1) {
    try {
        const response = await axios.get(`https://metreonhack.azurewebsites.net/messages?page=${page}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function fetchTransaction(hash) {
    try {
        const response = await axios.get(`https://metreonhack.azurewebsites.net/messages/${hash}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function fineHash(hash) {
    if (!hash) return hash;
    return hash.substring(0, 20) + '...';
}

export function fineId(id) {
    if (!id) return id;
    return id.substring(0, 7) + '...' + id.substring(id.length - 2, id.length);
}