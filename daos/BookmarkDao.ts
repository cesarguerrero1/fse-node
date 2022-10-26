/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our Bookmark Collection. The given DAO implements the BookmarkDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";

/**
 * @class The BookmarkDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {BookmarkDaoI}
 */
class BookmarkDao implements BookmarkDaoI {

    /**
    * Asynchronous function to create a new Bookmark
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} tid A string that represent the Tuit ID
    * @return {Promise<Bookmark>} Returns a Promise that when resolved will contain the newly created Bookmark Object
    */
    async userBookmarksTuit(uid: string, tid: string): Promise<Bookmark> {
        return await BookmarkModel.create({bookmarkedTuit:tid, bookmarkedBy: uid});
    }

    /**
    * Asynchronous function to delete a Bookmark
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} tid A string that represent the Tuit ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Bookmark record
    */ 
    async userUnbookmarksTuit(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteOne({bookmarkedTuit:tid, bookmarkedBy: uid});
    }

    /**
    * Asynchronous function to find all of the Bookmarks belonging to a given User
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Bookmark[]>} Returns a Promise that when resolved will contain an array of all the Bookmark Objects associated with the User
    */
    async findAllUsersBookmarks(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookMarkedBy: uid}).populate("bookmarkedTuit", {_id:1, tuit:1, postedOn:1}).exec();
    }

    /**
    * Asynchronous function to find all the Bookmarks in the database
    * @return {Promise<Bookmark[]>} Returns a Promise that when resolved will contain an array of all the Bookmark Obejcts in the database
    */
    async findAllBookmarks(): Promise<Bookmark[]> {
        return await BookmarkModel.find().populate("bookmarkedTuit", {_id:1, tuit:1, postedOn:1}).populate("bookmarkedBy", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

    /**
     * Asynchronous function to update an existing Bookmark record
     * @param bid A string representing the actual ID of the Bookmark record
     * @param bookmark A Bookmark Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Bookmark record
     */
    async updateBookmark(bid: string, bookmark: Bookmark): Promise<any> {
        return await BookmarkModel.updateOne({_id: bid}, {$set: bookmark});
    }

}

export default BookmarkDao;