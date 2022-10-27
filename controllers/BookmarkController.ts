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
        this.app.post("/users/:uid/bookmarks/:tid", this.userBookmarksTuit);
        this.app.delete("/users/:uid/bookmarks/:tid", this.userUnbookmarksTuit);
        this.app.get("/users/:uid/bookmarks", this.findAllUsersBookmarks);
        this.app.get("/bookmarks", this.findAllBookmarks);
        this.app.put("/bookmarks/:bid", this.updateBookmark);
    }
    
    /**
     * This function will be delegating the task of creating a new Bookmark Object
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing a User ID and Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Bookmark Recrod
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    userBookmarksTuit = (req: Request, res: Response) => {
        this.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid).then((bookmarks) => res.json(bookmarks));
    }

    /**
     * This function will be delegating the task of deleting a Bookmark record from within the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing a User ID and Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    userUnbookmarksTuit = (req: Request, res: Response) => {
        this.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid).then((bookmarks) => res.json(bookmarks));
    }

    /**
     * This function will be delegating the task of finding all Bookmarks associated with a given User
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the User ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Bookmarks associated with a given User
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllUsersBookmarks = (req: Request, res: Response) => {
        this.bookmarkDao.findAllUsersBookmarks(req.params.uid).then((bookmarks) => res.json(bookmarks))
    }

    /**
     * This function will be delegating the task of finding all Bookmarks in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Bookmark Objects from the database
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllBookmarks = (req: Request, res: Response) => {
        this.bookmarkDao.findAllBookmarks().then((bookmarks) => res.json(bookmarks));
    }

    /**
     * This function will be delegating the task of updating a Bookmark record
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the Bookmark ID and a Bookmark JSON in the body
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the update status
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    updateBookmark = (req: Request, res: Response) => {
        this.bookmarkDao.updateBookmark(req.params.bid, req.body)
    }
}

export default BookmarkController;