/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Server handles the instantiation of our controller and connects to our database, the rest is disseminated
 */

/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, response, Response} from 'express';
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

const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
//Database Connection
mongoose.connect('mongodb://localhost:27017/tuiter', options);

//Controller Instantiation
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);