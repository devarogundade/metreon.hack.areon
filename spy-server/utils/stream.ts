import { Request } from "express";
import { Message } from "../models/message";
import Decoder from "./decoder";

const decoder = new Decoder();

class Stream {
    init(request: Request): Message[] | null {
        const webhook: any = request.body;

        if (!webhook || !webhook.logs || webhook.confirmed) return null;

        const event = webhook.tag;

        const messages: Message[] = [];

        try {
            for (const log of webhook.logs) {
                const format = decoder.dispatchFormat(event);

                // abi format does not exists for event data
                if (format == null || typeof format === 'undefined') continue;

                const hash = log.transactionHash;
                const data = decoder.decodeLog(format, log.data);

                // object is invalid
                const message = decoder.toDisptachModel(
                    event,
                    data,
                    hash,
                    Number(webhook.chainId) as 80001 | 97 | 462
                );

                if (message == null || typeof message === 'undefined') continue;

                messages.push(message);
            }
            return messages;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default Stream;