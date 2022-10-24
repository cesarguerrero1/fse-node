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
        //JSDOC for this functions is located in the interface
        this.findAllUsers = (req, res) => {
            //As defined in the constructor, this function is called when a given HTTP request occurs
            //In this case the program is attempting to see all the users in our database so we call
            //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
            //the content to the user
            return this.userDao.findAllUsers().then((users) => res.json(users));
        };
        //JSDOC for this functions is located in the interface
        this.findUserById = (req, res) => 
        //We are trying to find a specific user so we need to look at the parameters
        //stored within our request to get the provided ID
        this.userDao.findUserById(req.params.userid).then(user => res.json(user));
        //JSDOC for this functions is located in the interface
        this.createUser = (req, res) => {
            //Since we are creating a user (whose information is stored in an object) we need
            //to include that object within the body of the request as opposed to the parameters
            return this.userDao.createUser(req.body).then(user => res.json(user));
        };
        //JSDOC for this functions is located in the interface
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.userid).then(status => res.json(status));
        //JSDOC for this functions is located in the interface 
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.userid, req.body).then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        //We are listening for these Type of HTTP Requests at these paths and when we get the given request, call the specified function 
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map