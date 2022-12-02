"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignemnt 2
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file The server file is the entry point into our program. We provide a connection to our remote Mongo Atlas Database
 * as well as instantiate instances of the appropriate controllers and connect them to our application. We are taking
 * advantage of encapsulation and the Singleton Pattern to make the code as readable as possible
 */
//Imports
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
//Controllers and DAO Imports
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const LikeDao_1 = __importDefault(require("./daos/LikeDao"));
const DislikeController_1 = __importDefault(require("./controllers/DislikeController"));
const DislikeDao_1 = __importDefault(require("./daos/DislikeDao"));
//Follows
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const FollowDao_1 = __importDefault(require("./daos/FollowDao"));
//Bookmarks
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const BookmarkDao_1 = __importDefault(require("./daos/BookmarkDao"));
//Messages
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const MessageDao_1 = __importDefault(require("./daos/MessageDao"));
//Authentication
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
//Importing the Session Stuff
const session = require('express-session');
//Importing more things!
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
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
};
//Secure Cookies only work with HTTPS
if (process.env.ENV === "PRODUCTION") {
    app.set('trust proxy', 1);
    sess.cookie.secure = true,
        sess.cookie.httpOnly = false,
        Object.assign(sess.cookie, { sameSite: "none" });
}
app.use(session(sess));
//Options for the Database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
//Connecting to REMOTE database. Notice that our username and password are hidden within environmental variables
mongoose_1.default.connect(`mongodb+srv://${process.env.FSE_USERNAME}:${process.env.FSE_PASSWORD}@cluster0.w5c0s1k.mongodb.net/tuiter?retryWrites=true&w=majority` || 'mongodb://localhost:27017/tuiter', options);
//Dao Instantiation
const userDao = new UserDao_1.default();
const tuitDao = new TuitDao_1.default();
const likeDao = new LikeDao_1.default();
const dislikeDao = new DislikeDao_1.default();
//Controller Instantiation
const userController = new UserController_1.default(app, userDao);
const tuitController = new TuitController_1.default(app, tuitDao);
const likeController = new LikeController_1.default(app, likeDao, dislikeDao, tuitDao);
const dislikeController = new DislikeController_1.default(app, dislikeDao, likeDao, tuitDao);
//Follows
const followController = new FollowController_1.default(app, new FollowDao_1.default());
//Bookmarks
const bookmarkController = new BookmarkController_1.default(app, new BookmarkDao_1.default());
//Messages
const messageController = new MessageController_1.default(app, new MessageDao_1.default());
//Importing our new controller
(0, auth_controller_1.default)(app, userDao);
//Defining what port to listen to
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map