/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the BookmarkController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * @class The BookmarkController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {BookmarkControllerI}
 */
class BookmarkController implements BookmarkControllerI{

    private app: Express;
    private bookmarkDao: BookmarkDao;

    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param bookmarkDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;

        //HTTP Listeners
        this.app.get();
        this.app.get();
        this.app.post();
        this.app.delete();
    }
        
}

export default BookmarkController;