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
const LikeModel_1 = __importDefault(require("../mongoose/LikeModel"));
/**
 * @class The LikeDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {LikeDaoI}
 */
class LikeDao {
    /**
    * Asynchronous function to find all Tuits liked by a given User
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Like[]>} Returns a Promise that when resolved will contain an array of all the Like Objects associated with the User
    */
    findAllTuitsLikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.find({ likedBy: uid }).populate("tuit", { _id: 1, tuit: 1, postedOn: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to find all the users that liked a given Tuit
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<Like[]>} Returns a Promise that when resolved will contain an array of all Like Objects associated with a given Tuit
    */
    findAllUsersThatLikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.find({ tuit: tid }).populate("tuit", { _id: 1, tuit: 1, postedOn: 1 }).populate("likedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to create a new Like record when a User likes a Tuit
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<Like>} Returns a Promise that when resolved will contain the newly created Like Object
    */
    userLikesTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.create({ tuit: tid, likedBy: uid });
        });
    }
    /**
    * Asynchronous function to delete an existing like record
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Like record
    */
    userUnlikesTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid });
        });
    }
    /**
     * Async function to find a given Tuit Disliked by a given User
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain either nothing or a given Like Record
     */
    findATuitLikedByUser(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.findOne({ tuit: tid, likedBy: uid });
        });
    }
    /**
     * Async function to count how many Like Records exist for a given Tuit
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @returns {Promise<any>} - An integer count of how many Dislike Records exist
     */
    countHowManyLikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield LikeModel_1.default.count({ tuit: tid });
        });
    }
}
exports.default = LikeDao;
//# sourceMappingURL=LikeDao.js.map