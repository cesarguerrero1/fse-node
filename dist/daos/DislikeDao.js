"use strict";
/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
*
* Assignment 4
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
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
/**
 * @class The DislikeDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 */
class DislikeDao {
    /**
     * Async function to find all Tuits disliked by a given User
     * @param uid - The ID of a user we are interested in
     * @returns {Promise<Dislike[]>} - Returns a Promise that when resolved will contain an array of Dislikes
     */
    findAllTuitsDislikedByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.find({ dislikedBy: uid }).populate({ path: "tuit", populate: { path: "postedBy" } }).populate("dislikedBy").exec();
        });
    }
    /**
     * Async function to find all the users that disliked a given Tuit
     * @param {string} tid - The id of a given Tuit
     * @returns {Promise<Dislike[]>} - Returns a Promise that when resolved will contain an array of Dislikes
     */
    findAllUsersThatDislikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.find({ tuit: tid }).populate("tuit", { _id: 1, tuit: 1, postedOn: 1 }).populate("dislikedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
     * Async function to create a new Dislike Record
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<Dislike>} - Returns a promise that when resolved will contain the newly created Dislike Object
     */
    userDislikesTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.create({ tuit: tid, dislikedBy: uid });
        });
    }
    /**
     * Async function to delete a Dislike Record
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain a status update for the deletion
     */
    userUndislikesTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.deleteOne({ tuit: tid, dislikedBy: uid });
        });
    }
    /**
     * Async function to find a given Tuit Disliked by a given User
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain either nothing or a given Dislike Record
     */
    findATuitDislikedByUser(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.findOne({ tuit: tid, dislikedBy: uid });
        });
    }
    /**
     * Async function to count how many Dislike Records exist for a given Tuit
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @returns {Promise<any>} - An integer count of how many Dislike Records exist
     */
    countHowManyDislikedTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.count({ tuit: tid });
        });
    }
}
exports.default = DislikeDao;
//# sourceMappingURL=DislikeDao.js.map