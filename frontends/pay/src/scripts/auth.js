/* eslint-disable no-undef */

export async function connectMetaMask(chain) {
    if (typeof ethereum === 'undefined') return null;
    try {
        await ethereum.request({
            method: 'eth_requestAccounts'
        });
        await switchToEVMChain(chain);
        let accounts = await ethereum.enable();
        return { status: 'ok', data: accounts[0] };
    } catch (error) {
        console.error(error);
        return { status: 'error', data: error };
    }
}

async function switchToEVMChain(chain) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
                chainId: chain.chainHexId
            }],
        });
    } catch (error) {
        if (error.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: chain.chainHexId,
                        chainName: chain.name,
                        nativeCurrency: {
                            name: chain.coin,
                            symbol: chain.symbol,
                            decimals: 18
                        },
                        blockExplorerUrls: [chain.explorer],
                        rpcUrls: [chain.rpc],
                    },],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
    }
}

export function fineAddress(addr) {
    return addr.substring(0, 5) + '...' + addr.substring(addr.length - 5, addr.length);
}