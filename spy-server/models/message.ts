import { Status } from "./status";
import { Token } from "./token";

export interface Message {
    messageId: string;
    status: Status;
    fromTrxHash: string;
    toTrxHash?: string;
    fee: number;
    feeToken: string;
    sequenceNumber: number;
    fromChainId: 11155111 | 80001 | 97 | 462;
    toChainId: 11155111 | 80001 | 97 | 462;
    sender: string;
    receiver: string;
    tokens: Token[];
    payMaster: number;
    payload: string;
    initializedTimestamp?: number;
    deliveredTimestamp?: number;
    failedTimestamp?: number;
    retriedTimestamp?: number;
}