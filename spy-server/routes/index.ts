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

            console.log('Moralis events: ', messages);


            if (!messages) {
                return res.send('No message was passed');
            }

            const result = controller.processMessages(messages);
            res.status(result.status).send(result);
        });

        router.get('/messages', async (req: Request, res: Response) => {
            const { page = 1, take = 10, query = null } = req.query;

            let q = {};
            if (query) {
                q = {
                    payload: query
                };
            }

            const result = await controller.allMessages(Number(page), Number(take), q);
            res.status(result.status).send(result);
        });

        router.get('/messages/:hash', async (req: Request, res: Response) => {
            const { hash } = req.params;

            const result = await controller.message(hash);
            res.status(result.status).send(result);
        });

        app.use('/', router);
    }
}

export default Route;