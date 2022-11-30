/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the TuitController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

/**
 * @class The TuitController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {TuitControllerI}
 */
class TuitController implements TuitControllerI {

    //Just like the UserController we need to access the app and DAO
    private app: Express;
    private tuitDao: TuitDao;

    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param tuitDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;

        //HTTP Listeners
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.post('/users/:uid/tuits', this.createTuitByUser);
        this.app.put('/tuits/:tid', this.updateTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
    }

    /**
     * This function will be delegating the task of finding all the Tuits in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all the Tuits in the database
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllTuits = (req: Request, res: Response) => {
        //As defined in the constructor, this function is called when a given HTTP request occurs
        //In this case the program is attempting to see all the Tuits in our database so we call
        //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
        //the content to the user
        this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
    }

    /**
     * This function will be delegating the task of finding all the Tuits belonging to a given User in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request object which contains a parameter for the User ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Tuits from a given user
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findTuitsByUser = async (req: Request, res: Response) => {
        let profile : any
        profile = req.session['profile'];
        let userId = req.params.uid;
        
        //All this is saying is that if the request is "me" AND the user is logged in, then use their user ID to search
        if(userId = req.params.uid === "me" && profile){
            userId = profile ._id
            const userTuits = await this.tuitDao.findTuitsByUser(userId);
            return res.send(userTuits)
        }else{
            //The request cannot be ME and the user not be logged in. We have no uid to use if this is the case
            if(userId === "me"){
                return res.sendStatus(403)
            }else{
                const userTuits = await this.tuitDao.findTuitsByUser(userId);
                return res.send(userTuits)
            }
        }
    }

    /**
     * This function will be delegating the task of finding a given Tuit using its ID within the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request object which contains a parameter for the Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a single JSON of the Tuit in question
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findTuitById = (req: Request, res: Response) => {
        //The ID for the Tuit is provided within the parameters field within the request object
        this.tuitDao.findTuitById(req.params.tid).then((tuit) => res.json(tuit));
    }

    /**
     * This function will be delegating the task of creating a new Tuit in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request object which contains a Tuit object in the body
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Tuit
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    createTuitByUser = async (req: Request, res: Response) => {
        //Since we are creating a Tuit (whose information is stored in an object) we need
        //to include that object within the body of the request. We also include the id of the user creating the Tuit
        let profile : any
        profile = req.session['profile'];
        let userId = req.params.uid;

        if(req.params.uid === "me" && profile){
            userId = profile ._id
            const newTuit = await this.tuitDao.createTuitByUser(userId, {...req.body, postedBy: userId})
            return res.json(newTuit);
        }else{
            if(userId === "me"){
                return res.send({});
            }else{
                const newTuit = await this.tuitDao.createTuitByUser(userId, {...req.body, postedBy: userId})
                return res.json(newTuit);
            }
        }
    }

    /**
     * This function will be delegating the task of updating a Tuit record in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request object which contains a parameter for the Tuit ID as well as Tuit Object in the body
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    updateTuit = (req: Request, res: Response) => {
        this.tuitDao.updateTuit(req.params.tid, req.body).then((status) => res.json(status));
    }

    /**
     * This function will be delegating the task of deleting a Tuit record from the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request object which contains a parameter for the Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    deleteTuit = (req: Request, res: Response) => {
        this.tuitDao.deleteTuit(req.params.tid).then((status) => res.json(status));
    }

}

export default TuitController;