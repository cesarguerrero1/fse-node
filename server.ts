/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering - Fall 2022!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
