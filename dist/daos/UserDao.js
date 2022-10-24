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
    //JSDOC for this functions is located in the interface
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all User Objects
            return yield UserModel_1.default.find();
        });
    }
    //JSDOC for this functions is located in the interface
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find the User Object with the given ID
            return yield UserModel_1.default.findById(uid);
        });
    }
    //JSDOC for this functions is located in the interface
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Insert a new User Object into the database
            return yield UserModel_1.default.create(user);
        });
    }
    //JSDOC for this functions is located in the interface
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete a User object with the given ID from the database
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    //JSDOC for this functions is located in the interface
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            //Update a User object with the given ID
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
//# sourceMappingURL=UserDao.js.map