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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class The FollowDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {FollowDaoI}
 */
class FollowDao {
    /**
    * Asynchronous function to create a new Follow record when a User follows another user
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represent the other Users unique ID
    * @return {Promise<Follow>} Returns a Promise that when resolved will contain the newly created Follow Object
    */
    userFollowsUser(uid, otherUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.create({ userFollowed: otherUid, userFollowing: uid });
        });
    }
    /**
    * Asynchronous function to delete an existing Follow record
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represent the other Users unique ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Follow record
    */
    userUnfollowsUser(uid, otherUid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.deleteOne({ userFollowed: otherUid, userFollowing: uid });
        });
    }
    /**
    * Asynchronous function to find all the people a given User follows
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Follow[]>} Returns a Promise that when resolved will contain an array of all the Follow Objects associated with the User
    * where the User "follows" another user
    */
    findPeopleIFollow(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.find({ userFollowing: uid }).populate("userFollowing").populate("userFollowed").exec();
        });
    }
    /**
    * Asynchronous function to find all the people who follow a given user
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Follow[]>} Returns a Promise that when resolved will contain an array of all the Follow Objects associated with the User
    * where the User "is being followed" by anotehr user
    */
    findPeopleWhoFollowMe(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.find({ userFollowed: uid }).populate("userFollowing").populate("userFollowed").exec();
        });
    }
    /**
    * Asynchronous function to delete all eixisting Follow records associated with a given user
    * @param {String} uid A string that represents a Users unique ID
    * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the deletion of the Follow record
    */
    deleteAUsersFollows(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.deleteMany({ $or: [{ userFollowed: uid }, { userFollowing: uid }] });
        });
    }
    /**
     * Asynchronous function to update an existing Follows record with a ranking for the follower
     * @param fid A string representing the actual ID of the Follow record
     * @param follow A Follow Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Follow record
     */
    userRanksFollower(fid, follow) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FollowModel_1.default.updateOne({ _id: fid }, { $set: follow });
        });
    }
}
exports.default = FollowDao;
//# sourceMappingURL=FollowDao.js.map