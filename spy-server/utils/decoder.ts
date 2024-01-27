import Web3 from 'web3';
import { Message } from '../models/message';
import { Status } from '../models/status';
import { Token } from '../models/token';

class Decoder {
    decodeLog(format: string[], value: string) {
        const web3 = new Web3('https://rpc.ankr.com/eth');
        return web3.eth.abi.decodeParameters(format, value);
    }

    dispatchFormat(event: string): string[] | null {
        if (event == 'sendMessage') {
            return ['bytes32', 'uint256', 'address', 'uint256', 'uint256', 'address', 'address', '(address,uint256)[]', 'uint8', 'bytes'];
        }
        return null;
    }

    toDisptachModel(event: string, data: any, transactionHash: string, fromChainId: 80001 | 97 | 462): Message | null {
        if (event == 'sendMessage') {
            const tokens: Token[] = [];

            data[7].forEach((token: any) => {
                tokens.push({ tokenId: token[0], amount: token[1] });
            });

            return {
                messageId: data[0],
                status: Status.INITIATED,
                fee: data[1],
                feeToken: data[2],
                sequenceNumber: data[3],
                fromChainId: fromChainId,
                toChainId: data[4],
                sender: data[5],
                receiver: data[6],
                tokens: tokens,
                payMaster: data[8],
                payload: data[9],
                fromTrxHash: transactionHash
            };
        }
        return null;
    }
}

export default Decoder;