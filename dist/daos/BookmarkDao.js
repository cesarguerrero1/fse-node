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
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class The BookmarkDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {BookmarkDaoI}
 */
class BookmarkDao {
    /**
    * Asynchronous function to create a new Bookmark
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} tid A string that represent the Tuit ID
    * @return {Promise<Bookmark>} Returns a Promise that when resolved will contain the newly created Bookmark Object
    */
    userBookmarksTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.create({ bookmarkedTuit: tid, bookmarkedBy: uid });
        });
    }
    /**
    * Asynchronous function to delete a Bookmark
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} tid A string that represent the Tuit ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Bookmark record
    */
    userUnbookmarksTuit(uid, tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
        });
    }
    /**
    * Asynchronous function to find all of the Bookmarks belonging to a given User
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Bookmark[]>} Returns a Promise that when resolved will contain an array of all the Bookmark Objects associated with the User
    */
    findAllUsersBookmarks(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.find({ bookMarkedBy: uid }).populate("bookmarkedTuit", { _id: 1, tuit: 1, postedOn: 1 }).exec();
        });
    }
    /**
    * Asynchronous function to find all the Bookmarks in the database
    * @return {Promise<Bookmark[]>} Returns a Promise that when resolved will contain an array of all the Bookmark Obejcts in the database
    */
    findAllBookmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.find().populate("bookmarkedTuit", { _id: 1, tuit: 1, postedOn: 1 }).populate("bookmarkedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
        });
    }
    /**
     * Asynchronous function to update an existing Bookmark record
     * @param bid A string representing the actual ID of the Bookmark record
     * @param bookmark A Bookmark Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Bookmark record
     */
    updateBookmark(bid, bookmark) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.updateOne({ _id: bid }, { $set: bookmark });
        });
    }
}
exports.default = BookmarkDao;
//# sourceMappingURL=BookmarkDao.js.map