/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignemnt 2
*/

/**
 * @file The server file is the entry point into our program. We provide a connection to our remote Mongo Atlas Database
 * as well as instantiate instances of the appropriate controllers and connect them to our application. We are taking
 * advantage of encapsulation and the Singleton Pattern to make the code as readable as possible
 */

//Imports and housekeeping
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
import LikeController from "./controllers/LikeController";
import LikeDao from "./daos/LikeDao";
//Follows
//Bookmarks
//Messages

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
//When we are working locally we ned to connect differently to our local database
//mongoose.connect('mongodb://localhost:27017/tuiter', options);
//Connecting to REMOTE database. Notice that our username and password are hidden within environmental variables
mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.w5c0s1k.mongodb.net/tuiter?retryWrites=true&w=majority`, options);

//Controller Instantiation
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const likeController = new LikeController(app, new LikeDao());
//Follows
//Bookmarks
//Messages

//Defining what port to listen to
const PORT = 4000;
app.listen(process.env.PORT || PORT);