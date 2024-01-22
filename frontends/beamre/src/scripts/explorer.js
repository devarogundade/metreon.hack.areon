import axios from 'axios'

const endpoint = 'https://node.swaycall.space/api'

export async function fetchMessages(addresses, page) {
    const data1 = addresses.toString()

    try {
        const response = await axios.get(`${endpoint}/forcontracts?slot1B256s=${data1}&page=${page}`)
        return response.data
    } catch (error) {
        console.error(error);
        return []
    }
}

export function fineHash(hash) {
    if (hash == '') return '- - - - -'
    if (hash.length < 20) return hash
    return hash.substring(0, 20) + '...'
}