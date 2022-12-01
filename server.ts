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

//Imports
import express from "express";
import mongoose from "mongoose";

//Controllers and DAO Imports
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
import TuitController from './controllers/TuitController';
import TuitDao from './daos/TuitDao';
import LikeController from "./controllers/LikeController";
import LikeDao from "./daos/LikeDao";
import DislikeController from "./controllers/DislikeController";
import DislikeDao from "./daos/DislikeDao";
//Follows
import FollowController from "./controllers/FollowController";
import FollowDao from "./daos/FollowDao";
//Bookmarks
import BookmarkController from "./controllers/BookmarkController";
import BookmarkDao from "./daos/BookmarkDao";
//Messages
import MessageController from "./controllers/MessageController";
import MessageDao from "./daos/MessageDao";
//Authentication
import AuthenticationController from "./controllers/auth-controller";

//Importing the Session Stuff
const session = require('express-session');

//If you want to store custom things in Sessions, you need to perform declaration-merging
declare module "express-session"{
    interface SessionData{
        profile: {};
    }
}

//Importing more things!
const app = express();
const cors = require('cors')
app.use(express.json());

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}));

//Options for our Session
const sess = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}

//Secure Cookies only work with HTTPS
if(process.env.ENV === "PRODUCTION"){
    app.set('trust proxy', 1)
    sess.cookie.secure = true,
    sess.cookie.httpOnly = false,
    Object.assign(sess.cookie, {sameSite: "none"});
}

app.use(session(sess))

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

//Connecting to REMOTE database. Notice that our username and password are hidden within environmental variables
mongoose.connect(`mongodb+srv://${process.env.FSE_USERNAME}:${process.env.FSE_PASSWORD}@cluster0.w5c0s1k.mongodb.net/tuiter?retryWrites=true&w=majority` || 'mongodb://localhost:27017/tuiter', options);

//Dao Instantiation
const userDao = new UserDao();
const tuitDao = new TuitDao();
const likeDao = new LikeDao();
const dislikeDao = new DislikeDao();

//Controller Instantiation
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);
const likeController = new LikeController(app, likeDao, dislikeDao, tuitDao);
const dislikeController = new DislikeController(app, dislikeDao, likeDao, tuitDao);
//Follows
const followController = new FollowController(app, new FollowDao());
//Bookmarks
const bookmarkController = new BookmarkController(app, new BookmarkDao());
//Messages
const messageController = new MessageController(app, new MessageDao());

//Importing our new controller
AuthenticationController(app, userDao);

//Defining what port to listen to
const PORT = 4000;
app.listen(process.env.PORT || PORT);