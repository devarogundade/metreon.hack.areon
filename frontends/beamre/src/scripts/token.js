import Web3 from 'web3';
import erc20 from '../contracts/erc20.json';
import axios from 'axios';
import Utils from '../utils';

export async function fetchPrices() {
    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,USDC`, {
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "deflate, gzip",
                "Access-Control-Allow-Origin": "*",
                "CMC_PRO_API_KEY": "92bdaf64-0563-48ef-8489-8acbb2eccf4c"
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function ercBalance(chain, currency, owner) {
    const web3 = new Web3(chain.rpc);

    const exactCurrency = Utils.exactCurrency(chain.id, currency.code);

    if (exactCurrency.isNative) return await web3.eth.getBalance(owner);

    const contract = new web3.eth.Contract(erc20.abi, exactCurrency.address);

    try {
        return await contract.methods.balanceOf(owner).call();
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function getErcAllocation(chain, currency, owner) {
    const web3 = new Web3(chain.rpc);

    const exactCurrency = Utils.exactCurrency(chain.id, currency.code);

    if (exactCurrency.isNative) return 1_000_000_000_000_000;

    const contract = new web3.eth.Contract(erc20.abi, exactCurrency.address);

    try {
        return await contract.methods.allowance(owner, Utils.beamreIds()[chain.id]).call();
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function ercApprove(chain, currency, amount) {
    const exactCurrency = Utils.exactCurrency(chain.id, currency.code);
    if (exactCurrency.isNative) return;

    // eslint-disable-next-line no-undef
    const web3 = new Web3(ethereum);
    // eslint-disable-next-line no-undef
    const accounts = await ethereum.enable();
    const contract = new web3.eth.Contract(erc20.abi, exactCurrency.address);
    try {
        return await contract.methods.approve(Utils.beamreIds()[chain.id], amount).send({ from: accounts[0] });
    } catch (error) {
        console.error(error);
        return null;
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
                    image: 'https://metreon.netlify.app/images/' + currency.image + '.png',
                },
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}