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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class The DislikeController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 */
class DislikeController {
    /**
     * This class will be instantiated within our server file and we will need
     * to connect to our application and DAOs
     * @param app - Instance of our Express Application
     * @param dislikeDao - The instance of our Dislike DAO to interact with the database
     * @param likeDao - The instance of our Like DAO to interact with the database
     * @param tuitDao - The instance of our Tuit DAO to interact with the database
     */
    constructor(app, dislikeDao, likeDao, tuitDao) {
        /**
         * This function will be delegating the task of finding all the Tuits disliked by a given user
         * to the DAO and then use the DAOs reponse to respond to the front-end
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Response Object from query which in this case contains a JSON of all Dislikes associated with a given user
         * @return - We are eitehr returning an array containg Tuits or an empty array
         */
        this.findAllTuitsDislikedByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            let profile;
            profile = req.session['profile'];
            let userId = uid;
            if (userId === "me" && profile) {
                userId = profile._id;
                const dislikes = yield this.dislikeDao.findAllTuitsDislikedByUser(userId);
                return res.json(dislikes);
            }
            else {
                if (userId === "me") {
                    return res.json([]);
                }
                else {
                    const dislikes = yield this.dislikeDao.findAllTuitsDislikedByUser(userId);
                    return res.json(dislikes);
                }
            }
        });
        /**
         * This function calls the DAO to get all the users who have disliked a particular Tuit
         * @param {RequestObject} req - Request Object with a parameter containing the Tuit ID
         * @param {ResponseObject} res - Response Object from query which is a JSON of all Dislikes associated with a given Tuit
         * @return - Either an empty array or an array of Dislikes
         */
        this.findAllUsersThatDislikedTuit = (req, res) => {
            this.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid).then((dislikes) => { res.json(dislikes); });
        };
        /**
         * Creating a new Dislike Record in the database
         * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
         * @param {ResponseObject} res - Reponse Object containing a JSON of the newly created Dislike Object
         * @return - The new Dislike Object
         */
        this.userDislikesTuit = (req, res) => {
            this.dislikeDao.userDislikesTuit(req.params.tid, req.params.uid).then((dislike) => res.json(dislike));
        };
        /**
         * Deleting a Dislike Record from the database
         * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
         * @param {ResponseObject} res - Response Object containing a status update for the deletion
         * @return - An object containg the status update for the deletion
         */
        this.userUndislikesTuit = (req, res) => {
            this.dislikeDao.userUndislikesTuit(req.params.tid, req.params.uid).then((dislikeUpdate) => res.json(dislikeUpdate));
        };
        /**
         * Look in the database to see if a user has disliked a particular Tuit
         * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
         * @param {ResponseObject} res - Response Object containing either nothing or a particular Dislike Object
         * @return - Either returns nothing or a Dislike Object
         */
        this.findATuitDislikedByUser = (req, res) => {
            this.dislikeDao.findATuitDislikedByUser(req.params.tid, req.params.uid).then((dislike) => res.json(dislike));
        };
        /**
         * When this function runs, we will be handling the Tuit, the Dislikes, and even the Likes. A Tuit cannot be simultaneously
         * liked and isliked at the same time. When a user Dislikes a Tuit we need to check if they have already disliked the Tuit
         * and react appropriately
         * @param {RequestObject} req - Request object containing the User and Tuit ID
         * @param {ResponseObject} res - Response Object containing the status code for the given request
         * @returns - A given status code indicating the response from the server
         */
        this.userTogglesTuitDislikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            let profile;
            profile = req.session['profile'];
            let userId = uid;
            let status = null;
            if (userId === "me" && profile) {
                userId = profile._id;
                status = yield this.tuitDislikeHelperFunction(tid, userId);
                if (status === 'success') {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                if (userId === "me") {
                    //You are not logged in
                    res.sendStatus(403);
                }
                else {
                    status = yield this.tuitDislikeHelperFunction(tid, userId);
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
        this.dislikeDao = dislikeDao;
        this.likeDao = likeDao;
        this.tuitDao = tuitDao;
        //HTTP Listeners
        this.app.get('/users/:uid/dislikes', this.findAllTuitsDislikedByUser);
        this.app.get('/tuits/:tid/dislikes', this.findAllUsersThatDislikedTuit);
        this.app.post('/users/:uid/dislikes/:tid', this.userDislikesTuit);
        this.app.delete('/users/:uid/dislikes/:tid', this.userUndislikesTuit);
        this.app.put('/users/:uid/dislikes/:tid', this.userTogglesTuitDislikes);
    }
    /**
     * Count how many Dislike records are associated with a given Tuit
     * @param {RequestObject} req - Request Object with a parameter containg a Tuit ID
     * @param {ResponseObject}res - Response Object containing an integer of how many records were found
     * @returns - Integer
     */
    countHowManyDislikedTuit(req, res) {
        return this.dislikeDao.countHowManyDislikedTuit(req.params.tid).then((count) => res.send(count));
    }
    /**
     * Just a quick helper function to keep code from getting too unruly
     */
    tuitDislikeHelperFunction(tid, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tuit;
            try {
                //Make sure Tuit exists
                tuit = yield this.tuitDao.findTuitById(tid);
                //Grab the the Dislike if it exists and the data associated with it
                const userAlreadyDislikedTuit = yield this.dislikeDao.findATuitDislikedByUser(tid, userId);
                const howManyDislikedTuit = yield this.dislikeDao.countHowManyDislikedTuit(tid);
                //Check if the user has or has not already Disliked the Tuit
                if (userAlreadyDislikedTuit) {
                    yield this.dislikeDao.userUndislikesTuit(tid, userId);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                }
                else {
                    //Handle counteracting the possiblity of the user already liking the Tuit
                    const userAlreadyLikedTuit = yield this.likeDao.findATuitLikedByUser(tid, userId);
                    if (userAlreadyLikedTuit) {
                        const howManyLikedTuit = yield this.likeDao.countHowManyLikedTuit(tid);
                        yield this.likeDao.userUnlikesTuit(tid, userId);
                        tuit.stats.likes = howManyLikedTuit - 1;
                    }
                    yield this.dislikeDao.userDislikesTuit(tid, userId);
                    tuit.stats.dislikes = howManyDislikedTuit + 1;
                }
                yield this.tuitDao.updateDislikes(tid, tuit.stats);
                return "success";
            }
            catch (error) {
                return "error";
            }
        });
    }
}
exports.default = DislikeController;
//# sourceMappingURL=DislikeController.js.map