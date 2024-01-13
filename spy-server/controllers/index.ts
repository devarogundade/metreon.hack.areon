import { Worker } from "worker_threads";
import { Message } from "../models/message";
import { NodeResponse, Paged } from "../routes/interface";
import MessageSchema from "../database/schemas";

export class Controller {
    processMessages(messages: Message[]): NodeResponse<null> {
        messages.forEach(message => {
            new Worker(
                __dirname + "workers/index.js",
                {
                    workerData: { message }
                }
            );
        });

        return { status: 200 };
    }

    async allMessages(take: number, skip: number, query: any): Promise<NodeResponse<Paged<Message[]>>> {
        try {
            const count = await MessageSchema.countDocuments();

            const data = await MessageSchema.find(query)
                .limit(take * 1)
                .skip((skip - 1) * take)
                .sort({ dispatchTimestamp: 'desc' });

            return {
                status: 200,
                data: {
                    total: count,
                    lastPage: Math.ceil(count / take),
                    data: data as unknown as Message[]
                }
            };
        } catch (error) {
            return { status: 400 };
        }
    }

    async message(hash: string): Promise<NodeResponse<Message>> {
        try {
            const data = await MessageSchema.findOne({
                $or: [
                    { messageId: hash },
                    { fromTrxHash: hash },
                    { toTrxHash: hash }
                ]
            });

            return {
                status: 200,
                data: data as unknown as Message
            };
        } catch (error) {
            return { status: 400 };
        }
    }
}