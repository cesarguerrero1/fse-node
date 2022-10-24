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
//Imports and housekeeping
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
//Controllers and DAO Imports
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
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
//When we are working locally we ned to connect differently to our local database
//mongoose.connect('mongodb://localhost:27017/tuiter', options);
//Connecting to REMOTE database. Notice that our username and password are hidden within environmental variables
mongoose_1.default.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.w5c0s1k.mongodb.net/tuiter?retryWrites=true&w=majority`, options);
//Controller Instantiation
const userController = new UserController_1.default(app, new UserDao_1.default());
const tuitController = new TuitController_1.default(app, new TuitDao_1.default());
//Defining what port to listen to
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map