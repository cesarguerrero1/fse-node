/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the UserController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class The UserController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {UserControllerI}
 */
class UserController implements UserControllerI {

    //We are expecting an app of TYPE EXPRESS
    private app: Express;
    //We are expecting a DAO of TYPE UserDAO
    private userDao: UserDao;
    
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param userDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        
        //We are listening for these Type of HTTP Requests at these paths and when we get the given request, call the specified function 
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }

    /**
     * This function will be delegating the task of finding all the users in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all the Users in the database
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllUsers = (req: Request, res: Response) => {
        //As defined in the constructor, this function is called when a given HTTP request occurs
        //In this case the program is attempting to see all the users in our database so we call
        //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
        //the content to the user
        return this.userDao.findAllUsers().then((users) => res.json(users));
    }

    /**
     * This function will be delegating the task of finding a specific user with the given ID in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the User ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of a single User Object
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findUserById = (req: Request, res: Response) =>
        //We are trying to find a specific user so we need to look at the parameters
        //stored within our request to get the provided ID
        this.userDao.findUserById(req.params.userid).then(user => res.json(user));
    
    /**
     * This function will be delegating the task of creating a new user in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a User Object in the body of the request
     * @param {ResponseObject} res Reponse Object from query which in this case is a JSON of the newly created User Object
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    createUser = (req: Request, res: Response) =>{
        //Since we are creating a user (whose information is stored in an object) we need
        //to include that object within the body of the request as opposed to the parameters
        return this.userDao.createUser(req.body).then(user => res.json(user));
    }

    /**
     * This function will be delegating the task of deleting a user in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the User ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update for the deletion
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid).then(status => res.json(status));

    /**
     * This function will be delegating the task of update a specific User record in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the User ID as well as a User Object in the body of the request
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update for the User Udpdate
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body).then(status => res.json(status));
}

export default UserController;
