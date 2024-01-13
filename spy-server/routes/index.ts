import { Express, Request, Response, Router } from "express";
import { Controller } from "../controllers";
import Stream from "../utils/stream";

const router = Router();
const stream = new Stream();
const controller = new Controller();

class Route {
    init(app: Express) {
        router.post('/moralis/events', async (req: Request, res: Response) => {
            const messages = stream.init(req);
            if (!messages) {
                return res.send('No message was passed');
            }

            const result = controller.processMessages(messages);
            res.status(result.status).send(result);
        });

        router.post('/messages', async (req: Request, res: Response) => {
            const { take, skip } = req.query;
            const query = req.body;

            const result = await controller.allMessages(Number(take), Number(skip), query);
            res.status(result.status).send(result);
        });

        router.post('/messages/:hash', async (req: Request, res: Response) => {
            const { hash } = req.params;

            const result = await controller.message(hash);
            res.status(result.status).send(result);
        });

        app.use('/', router);
    }
}

export default Route;