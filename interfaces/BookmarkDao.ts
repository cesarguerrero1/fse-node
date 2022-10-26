/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

import Bookmark from "../models/Bookmark";

/**
 * @file This file contains the interface that the Data Access Object for our Bookmark will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

/**
 * @interface BookmarkDao The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface BookmarkDao{
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;

    findAllUsersBookmarks(uid: string): Promise<Bookmark[]>;

    findAllBookmarks(): Promise<Bookmark[]>;

    updateBookmark(bid: string, bookmark: Bookmark): Promise<any>;
}

export default BookmarkDao;