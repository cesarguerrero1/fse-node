"use strict";
/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class The FollowController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {FollowControllerI}
 */
class FollowController {
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param followDao The DAO that will allow us to interact with the database
     */
    constructor(app, followDao) {
        /**
         * This function will be delegating the task of creating a new Follow Object
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing two unique User IDs
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Follow record
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userFollowsUser = (req, res) => {
            this.followDao.userFollowsUser(req.params.uid, req.params.otherUid).then((follows) => res.json(follows));
        };
        /**
         * This function will be delegating the task of deleting a Follow record from within the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing two User IDs
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userUnfollowsUser = (req, res) => {
            this.followDao.userUnfollowsUser(req.params.uid, req.params.otherUid).then((follows) => res.json(follows));
        };
        /**
         * This function will be delegating the task of finding all users a given user Follows
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Follows where the User is following another person
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findPeopleIFollow = (req, res) => {
            this.followDao.findPeopleIFollow(req.params.uid).then((follows) => res.json(follows));
        };
        /**
         * This function will be delegating the task of finding all users a given user is being followed by
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Follows where the User is following another person
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findPeopleWhoFollowMe = (req, res) => {
            this.followDao.findPeopleWhoFollowMe(req.params.uid).then((follows) => res.json(follows));
        };
        /**
         * This function will be delegating the task of deleting all Follows associated with a User
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.deleteAUsersFollows = (req, res) => {
            this.followDao.deleteAUsersFollows(req.params.uid).then((follows) => res.json(follows));
        };
        /**
         * This function will be delegating the task of updating a Follow record
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID and Follow JSON in the body
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the update status
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userRanksFollower = (req, res) => {
            this.followDao.userRanksFollower(req.params.uid, req.body).then((follows) => res.json(follows));
        };
        this.app = app;
        this.followDao = followDao;
        //HTTP Listeners
        this.app.post("/users/:uid/follows/:otherUid", this.userFollowsUser);
        this.app.delete("/users/:uid/follows/:otherUid", this.userUnfollowsUser);
        this.app.get("/users/:uid/follower", this.findPeopleIFollow);
        this.app.get("/users/:uid/following", this.findPeopleWhoFollowMe);
        this.app.delete("/users/:uid/follows", this.deleteAUsersFollows);
        this.app.put("/follows/:fid", this.userRanksFollower);
    }
}
exports.default = FollowController;
//# sourceMappingURL=FollowController.js.map