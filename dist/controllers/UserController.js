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
 * @class The UserController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {UserControllerI}
 */
class UserController {
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param userDao The DAO that will allow us to interact with the database
     */
    constructor(app, userDao) {
        /**
         * This function will be delegating the task of finding all the users in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req When we call this function we will be providing a Request Object where we can store things like query parameters
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all the Users in the database
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllUsers = (req, res) => {
            //As defined in the constructor, this function is called when a given HTTP request occurs
            //In this case the program is attempting to see all the users in our database so we call
            //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
            //the content to the user
            return this.userDao.findAllUsers().then((users) => res.json(users));
        };
        /**
         * This function will be delegating the task of finding a specific user with the given ID in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of a single User Object
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findUserById = (req, res) => 
        //We are trying to find a specific user so we need to look at the parameters
        //stored within our request to get the provided ID
        this.userDao.findUserById(req.params.uid).then(user => res.json(user));
        /**
         * This function will be delegating the task of creating a new user in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a User Object in the body of the request
         * @param {ResponseObject} res Reponse Object from query which in this case is a JSON of the newly created User Object
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.createUser = (req, res) => {
            //Since we are creating a user (whose information is stored in an object) we need
            //to include that object within the body of the request as opposed to the parameters
            return this.userDao.createUser(req.body).then(user => res.json(user));
        };
        /**
         * This function will be delegating the task of deleting a user in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update for the deletion
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.uid).then(status => res.json(status));
        /**
         * This function will be delegating the task of update a specific User record in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID as well as a User Object in the body of the request
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update for the User Udpdate
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.uid, req.body).then(status => res.json(status));
        //Adding the two new functions
        this.deleteAllUsers = (req, res) => {
            return this.userDao.deleteAllUsers().then(status => res.json(status));
        };
        this.deleteUsersByUsername = (req, res) => {
            return this.userDao.deleteUsersByUsername(req.params.username).then(status => res.json(status));
        };
        this.app = app;
        this.userDao = userDao;
        //We are listening for these Type of HTTP Requests at these paths and when we get the given request, call the specified function 
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:uid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:uid', this.deleteUser);
        this.app.put('/users/:uid', this.updateUser);
        //Added these as they were implemented in the source code for A3
        this.app.delete('/users', this.deleteAllUsers);
        this.app.delete('/users/username/:username/delete', this.deleteUsersByUsername);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map