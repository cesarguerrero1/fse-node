"use strict";
/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 *
 * Assignment 1 - Given User Data Access Object Code
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
class UserDao {
    //From within the User Collection of the database, get all the users
    //NOTE: async at the start of a function FORCES it to return a promise!
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find();
        });
    }
    //From within the User Collection of the database, get a specific User
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(uid);
        });
    }
    //Within the User Collection of the database create a User
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    //Within the User Collection of the database delete a user
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    ////Within the User Collection of the database update a user
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { set: user });
        });
    }
}
exports.default = UserDao;
//# sourceMappingURL=UserDao.js.map