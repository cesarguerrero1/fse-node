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
     * @param likeDao The DAO that will allow us to interact with the database
     * @param dislikeDao The DAO that will allow us to interact with the database
     * @param tuitDao The DAO that will allow us to interact with the database
     */
    constructor(app, likeDao, dislikeDao, tuitDao) {
        /**
         * This function will be delegating the task of finding all the Tuits liked by a given user in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Likes associated with a given user
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllTuitsLikedByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            let profile;
            profile = req.session['profile'];
            let userId = uid;
            if (uid === "me" && profile) {
                userId = profile._id;
                const likes = yield this.likeDao.findAllTuitsLikedByUser(userId);
                return res.json(likes);
            }
            else {
                if (userId === "me") {
                    return res.json([]);
                }
                else {
                    const likes = yield this.likeDao.findAllTuitsLikedByUser(userId);
                    return res.json(likes);
                }
            }
        });
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
        /**
         * When this function runs, we will be handling the Tuit, the Dislikes, and even the Likes. A Tuit cannot be simultaneously
         * liked and isliked at the same time. When a user Dislikes a Tuit we need to check if they have already disliked the Tuit
         * and react appropriately
         * @param {RequestObject} req - Request object containing the User and Tuit ID
         * @param {ResponseObject} res - Response Object containing the status code for the given request
         * @returns - A given status code indicating the response from the server
         */
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            let profile;
            profile = req.session['profile'];
            let userId = uid;
            let status = null;
            if (userId === "me" && profile) {
                userId = profile._id;
                status = yield this.tuitLikeHelperFunction(tid, userId);
                if (status === 'success') {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                //We aren't logged in, but maybe we are attempting to send from something like Postman
                if (userId === "me") {
                    //You aren't logged in!
                    res.sendStatus(403);
                }
                else {
                    status = yield this.tuitLikeHelperFunction(tid, userId);
                    if (status === 'success') {
                        res.sendStatus(200);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
            }
        });
        this.app = app;
        this.likeDao = likeDao;
        this.dislikeDao = dislikeDao;
        this.tuitDao = tuitDao;
        //HTTP Listeners
        this.app.get('/users/:uid/likes', this.findAllTuitsLikedByUser);
        this.app.get('/tuits/:tid/likes', this.findAllUsersThatLikedTuit);
        this.app.post('/users/:uid/likes/:tid', this.userLikesTuit);
        this.app.delete('/users/:uid/likes/:tid', this.userUnlikesTuit);
        this.app.put('/users/:uid/likes/:tid', this.userTogglesTuitLikes);
    }
    /**
     * Look in the database to see if a user has liked a particular Tuit
     * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
     * @param {ResponseObject} res - Response Object containing either nothing or a particular Like Object
     * @return - Either returns nothing or a Like Object
     */
    findATuitLikedByUser(req, res) {
        return this.likeDao.findATuitLikedByUser(req.params.tid, req.params.uid).then((like) => res.json(like));
    }
    /**
     * Count how many Like records are associated with a given Tuit
     * @param {RequestObject} req - Request Object with a parameter containg a Tuit ID
     * @param {ResponseObject}res - Response Object containing an integer of how many records were found
     * @returns - Integer
     */
    countHowManyLikedTuit(req, res) {
        return this.likeDao.countHowManyLikedTuit(req.params.tid).then((count) => res.send(count));
    }
    /**
     * Just a quick helper function to keep code from getting too unruly
     */
    tuitLikeHelperFunction(tid, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tuit;
            try {
                //Check if the tuit even exists
                tuit = yield this.tuitDao.findTuitById(tid);
                //Grab how many likes are associated with this Tuit and see if a User has already Liked it
                const userAlreadyLikedTuit = yield this.likeDao.findATuitLikedByUser(tid, userId);
                const howManyLikedTuit = yield this.likeDao.countHowManyLikedTuit(tid);
                //Now we need some logic! We are attempting to like a Tuit so we have two scenarios
                if (userAlreadyLikedTuit) {
                    //The user has already like the Tuit and are now clicking it again! No need to counteract dislikes
                    yield this.likeDao.userUnlikesTuit(tid, userId);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                else {
                    //The user has not liked the Tuit yet! However we now need to counterct the dislike if necessary
                    //Grab how many dislikes are associated with this Tuit and see if a User has already Disliked it
                    const userAlreadyDislikedTuit = yield this.dislikeDao.findATuitDislikedByUser(tid, userId);
                    if (userAlreadyDislikedTuit) {
                        const howManyDislikedTuit = yield this.dislikeDao.countHowManyDislikedTuit(tid);
                        //The user currently dislikes the Tuit so remove it!
                        yield this.dislikeDao.userUndislikesTuit(tid, userId);
                        tuit.stats.dislikes = howManyDislikedTuit - 1;
                    }
                    //We are all set to add our like
                    yield this.likeDao.userLikesTuit(tid, userId);
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                //Now update the stats!
                yield this.tuitDao.updateLikes(tid, tuit.stats);
                return 'success';
            }
            catch (error) {
                return 'error';
            }
        });
    }
}
exports.default = LikeController;
//# sourceMappingURL=LikeController.js.map