"use strict";
/*
* Cesar Guerrero
* 10/25/22
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
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class The MessageDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {MessageDaoI}
 */
class MessageDao {
    /**
    * Asynchronous function to create a new Message
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represents a Users unique ID
    * @param {Message} message A Message Object in the form of a JSON object that contains all name-value pairs for information you wish to create
    * @return {Promise<Message>} Returns a Promise that when resolved will contain the newly created Message Object
    */
    userSendsMessageToUser(uid, otherUid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.create(message);
        });
    }
    /**
    * Asynchronous function to find all of the Messages a given user has sent
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Objects that a user has sent
    */
    findUsersMessagesSent(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.find({ from: uid }).populate("to", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to find all of the Messages a given user has received
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Objects that a user has received
    */
    findUsersMessagesReceived(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.find({ to: uid }).populate("from", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to delete a Message
    * @param {String} mid A string that represents the Message ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Message record
    */
    userDeleteMessage(mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.deleteOne({ mid });
        });
    }
    /**
     * Asynchronous function to update an existing Message record
     * @param mid A string representing the actual ID of the Message record
     * @param message A Message Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Message record
     */
    userEditsMessage(mid, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.updateOne({ _id: mid }, { $set: message });
        });
    }
    /**
    * Asynchronous function to find all the Messages in the database
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Obejcts in the database
    */
    findAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.find().populate("to", { _id: 1, username: 1, firstName: 1, lastName: 1 }).populate("from", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
}
exports.default = MessageDao;
//# sourceMappingURL=MessageDao.js.map