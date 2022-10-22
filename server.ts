//Library Imports
import express, {Request, Response} from "express";
import mongoose from "mongoose";
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

//Controllers and DAO Imports
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
import TuitController from './controllers/TuitController';
import TuitDao from './daos/TuitDao';


//Connecting to the database

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

//Connecting to REMOTE database
mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.w5c0s1k.mongodb.net/tuiter?retryWrites=true&w=majority`, options);

//Controller Instantiation
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */

 const PORT = 4000;
 app.listen(process.env.PORT || PORT);
