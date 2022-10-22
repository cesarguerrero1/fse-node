//Library Imports
import express, {Request, Response} from "express";
import mongoose from "mongoose";
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

//Options for the Database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

//Connecting to the database
//mongoose.connect('mongodb://localhost:27017/fsd', options);


function sayHello (req: Request, res: Response) {
    res.send('Hi from FSD 1!!!');
}

app.get('/', sayHello);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
