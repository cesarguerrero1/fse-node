/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our BookmarkDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

 import { Request, Response } from "express";

/**
 * @interface BookmarkController The interface contains all of the methods a given Controller will need to implement
 */
interface BookmarkController{

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    findAllUsersBookmarks(req: Request, res: Response): void;

    findAllBookmarks(req: Request, res: Response): void;

    updateBookmark(req: Request, res: Response): void;

}

export default BookmarkController;


