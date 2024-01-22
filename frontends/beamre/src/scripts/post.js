import axios from 'axios'

const endpoint = 'https://node.swaycall.space'

// @dev test function
export async function postStream(transaction, transactionId) {
    transaction.fromHash = transactionId
    await axios.post(`${endpoint}/events-fuel`, transaction)
}