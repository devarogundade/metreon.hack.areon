import Web3 from 'web3'
import erc20 from '../contracts/erc20.json'
import axios from 'axios'
import Utils from '../utils'
import { Wallet, Provider } from 'fuels'

export async function fetchPrices() {
    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,USDC`, {
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "deflate, gzip",
                "Access-Control-Allow-Origin": "*",
                "CMC_PRO_API_KEY": "92bdaf64-0563-48ef-8489-8acbb2eccf4c"
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return 0
    }
}

export async function ercBalance(chain, currency, owner) {
    const web3 = new Web3(chain.rpc)

    let exactCurrency = Utils.exactCurrency(chain.id, currency.symbol)

    const contract = new web3.eth.Contract(erc20.abi, exactCurrency.address)
    if (currency.isNative) return await web3.eth.getBalance(owner)
    try {
        return await contract._methods.balanceOf(owner).call()
    } catch (error) {
        console.error(error)
        return 0
    }
}

export async function getErcAllocation(chain, currency, owner) {
    const web3 = new Web3(chain.rpc)
    const contract = new web3.eth.Contract(erc20.abi, currency.address)
    if (currency.isNative) return 1000000000000000
    try {
        return await contract._methods.allowance(owner, Utils.supernovaIds()[chain.id]).call();
    } catch (error) {
        console.error(error)
        return 0
    }
}

export async function ercApprove(chain, currency, amount) {
    // eslint-disable-next-line no-undef
    const web3 = new Web3(ethereum);
    // eslint-disable-next-line no-undef
    const accounts = await ethereum.enable()
    const contract = new web3.eth.Contract(erc20.abi, currency.address)
    if (currency.isNative) return
    try {
        return await contract._methods.approve(Utils.supernovaIds()[chain.id], amount).send({ from: accounts[0] })
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function fuelBalances(currency, owner) {
    try {
        const provider = new Provider('https://beta-3.fuel.network/graphql')
        const wallet = Wallet.fromAddress(owner)
        wallet.connect(provider)

        let exactCurrency = Utils.exactCurrency(0, currency.symbol)

        const response = await wallet.getBalances();
        const bal = response.find(balance => balance.assetId.toLowerCase() == exactCurrency.address.toLowerCase())
        return bal.amount
    } catch (error) {
        console.error(error);
        return []
    }
}

export async function addToMetaMask(currency) {
    try {
        // eslint-disable-next-line no-undef
        await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: currency.address,
                    symbol: currency.symbol,
                    decimals: '18',
                    image: 'https://supernova.swaycall.space/images/' + currency.image + '.png',
                },
            },
        });
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}