import Web3 from 'web3';
import { Message } from '../models/message';
import { Status } from '../models/status';

class Decoder {
    decodeLog(format: string[], value: string) {
        const web3 = new Web3('https://rpc.ankr.com/eth');
        return web3.eth.abi.decodeParameters(format, value);
    }

    dispatchFormat(event: string): string[] | null {
        if (event == 'sendMessage') {
            return ['bytes32', 'address', 'address', 'uint256', 'uint256', 'bytes', 'bytes32'];
        }
        return null;
    }

    toDisptachModel(event: string, data: any, transactionHash: string, fromChainId: 11155111 | 80001 | 97 | 462): Message | null {
        if (event == 'sendMessage') {
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
                tokens: data[7],
                payMaster: data[8],
                payload: data[9],
                fromTrxHash: transactionHash
            };
        }
        return null;
    }
}

export default Decoder;