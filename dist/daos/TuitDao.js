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
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class The TuitDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {TuitDaoI}
 */
class TuitDao {
    /**
    * Asynchronous function to find all Tuit Objects within a database
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects within the Database
    */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all Tuit Objects
            return yield TuitModel_1.default.find().populate("postedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to find all Tuit Objects belonging to a given User
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects belonging to the User with the given unique ID
    */
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all Tuit Objects associated with the given user.
            //NOTE: When we find the user, we want to populate their information into the field
            //that normally just contains their ID
            return yield TuitModel_1.default.find({ postedBy: uid }).populate('postedBy').exec();
        });
    }
    /**
    * Asynchronous function to find a specific Tuit Object within a database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<Tuit>} Returns a Promise that when resolved will contain a single Tuit object
    */
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find the Tuit Object with the given ID
            return yield TuitModel_1.default.findById(tid).populate("postedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to create a Tuit record within the database
    * @param {TuitObject} tuit A Tuit object that you wish to insert into the database
    * @return {Promise<Tuit>}  Returns a Promise that when resolved will contain the newly created Tuit Object
    */
    createTuitByUser(uid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            //Insert a new Tuit Object into the database
            return yield TuitModel_1.default.create(tuit);
        });
    }
    /**
    * Asynchronous function to delete a Tuit record within the database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
    */
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete a Tuit object with the given ID from the database
            return yield TuitModel_1.default.deleteOne({ _id: tid });
        });
    }
    /**
    * Asynchronous function to find and update a specific Tuit Object within a database
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {TuitObject} tuit A Tuit Object in the form of a JSON object that contains all name-value pairs for information you wish to update
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
    */
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            //Update a Tuit object with the given ID
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: tuit });
        });
    }
    /**
     * Async function to update the tuit stats - This should only be used when liking a Tuit
     * @param {String} tid A string that represents the unique ID of the Tuit within the database
     * @param {Object} newStats -   An object containing the new like and dislike count
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    updateLikes(tid, newStats) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
    /**
     * Async function to update the tuit stats - This should only be used when disliking a Tuit
     * @param {String} tid A string that represents the unique ID of the Tuit within the database
     * @param {Object} newStats - An object containing the new like and dislike count
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    updateDislikes(tid, newStats) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
    }
}
exports.default = TuitDao;
//# sourceMappingURL=TuitDao.js.map