"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../mongoose/UserModel")); //We need the model so we can interact with the Database
/**
 * @class The UserDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {UserDaoI}
 */
class UserDao {
    /**
     * Asynchronous function to find all User Objects within a database
     * @return {Promise<User[]>} Returns a Promise that when resolved will contain an array of all the User Objects within the Database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all User Objects
            return yield UserModel_1.default.find();
        });
    }
    /**
     * Asynchronous function to find a specific User Object within a database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain either a single User Object or a null
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find the User Object with the given ID
            return yield UserModel_1.default.findById(uid);
        });
    }
    /**
     * Asynchronous function to create a User record within the database
     * @param {UserObject} user A User object that you wish to insert into the database
     * @return {Promise<User>}  Returns a Promise that when resolved will contain the newly created User Object
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Insert a new User Object into the database
            return yield UserModel_1.default.create(user);
        });
    }
    /**
     * Asynchronous function to find and update a specific User Object within a database
     * @param {String} uid A string that represents the Users unique ID within the database
     * @param {UserObject} user A User Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Update a User object with the given ID
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
    /**
     * Asynchronous function to delete a User record within the database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete a User object with the given ID from the database
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    //Adding the two new functions
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteMany();
        });
    }
    deleteUsersByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ username: username });
        });
    }
}
exports.default = UserDao;
//# sourceMappingURL=UserDao.js.map