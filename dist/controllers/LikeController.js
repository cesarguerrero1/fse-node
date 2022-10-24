"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class The LikeController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {LikeControllerI}
 */
class LikeController {
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param LikeDao The DAO that will allow us to interact with the database
     */
    constructor(app, likeDao) {
        /**
         * This function will be delegating the task of finding all the Tuits liked by a given user in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Likes associated with a given user
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            this.likeDao.findAllTuitsLikedByUser(req.params.uid).then((likes) => res.json(likes));
        };
        /**
         * This function will be delegating the task of finding all the users who have ever liked a given Tuit in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the Tuit ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Likes associated with a given Tuit
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllUsersThatLikedTuit = (req, res) => {
            this.likeDao.findAllUsersThatLikedTuit(req.params.tid).then((likes) => res.json(likes));
        };
        /**
         * This function will be delegating the task of creating a new Like Object
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing both a User ID and Tuit ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Like record
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userLikesTuit = (req, res) => {
            this.likeDao.userLikesTuit(req.params.tid, req.params.uid).then((likes) => res.json(likes));
        };
        /**
         * This function will be delegating the task of deleting a Like record from within the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing both a User ID and Tuit ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userUnlikesTuit = (req, res) => {
            this.likeDao.userUnlikesTuit(req.params.tid, req.params.uid).then((likes) => res.json(likes));
        };
        this.app = app;
        this.likeDao = likeDao;
        //HTTP Listeners
        this.app.get('/users/:uid/likes', this.findAllTuitsLikedByUser);
        this.app.get('/tuits/:tid/likes', this.findAllUsersThatLikedTuit);
        this.app.post('/users/:uid/likes/:tid', this.userLikesTuit);
        this.app.delete('/users/:uid/likes/:tid', this.userUnlikesTuit);
    }
}
exports.default = LikeController;
//# sourceMappingURL=LikeController.js.map