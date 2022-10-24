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
 * @class The TuitController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {TuitControllerI}
 */
class TuitController {
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param tuitDao The DAO that will allow us to interact with the database
     */
    constructor(app, tuitDao) {
        /**
         * This function will be delegating the task of finding all the Tuits in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req When we call this function we will be providing a Request Object where we can store things like query parameters
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all the Tuits in the database
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllTuits = (req, res) => {
            //As defined in the constructor, this function is called when a given HTTP request occurs
            //In this case the program is attempting to see all the Tuits in our database so we call
            //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
            //the content to the user
            this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
        };
        /**
         * This function will be delegating the task of finding a given Tuit using its ID within the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request object which contains a parameter for the Tuit ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a single JSON of the Tuit in question
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findTuitById = (req, res) => {
            //The ID for the Tuit is provided within the parameters field within the request object
            this.tuitDao.findTuitById(req.params.tid).then((tuit) => res.json(tuit));
        };
        /**
         * This function will be delegating the task of finding all the Tuits belonging to a given User in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request object which contains a parameter for the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Tuits from a given user
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findTuitsByUser = (req, res) => {
            this.tuitDao.findTuitsByUser(req.params.uid).then((tuits) => res.json(tuits));
        };
        /**
         * This function will be delegating the task of creating a new Tuit in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request object which contains a Tuit object in the body
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Tuit
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.createTuit = (req, res) => {
            //Since we are creating a Tuit (whose information is stored in an object) we need
            //to include that object within the body of the request as opposed to the parameters
            this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
        };
        /**
         * This function will be delegating the task of deleting a Tuit record from the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request object which contains a parameter for the Tuit ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.deleteTuit = (req, res) => {
            this.tuitDao.deleteTuit(req.params.tid).then((status) => res.json(status));
        };
        /**
         * This function will be delegating the task of updating a Tuit record in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request object which contains a parameter for the Tuit ID as well as Tuit Object in the body
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON with a status update
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.updateTuit = (req, res) => {
            this.tuitDao.updateTuit(req.params.tid, req.body).then((status) => res.json(status));
        };
        this.app = app;
        this.tuitDao = tuitDao;
        //HTTP Listeners
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('/users/:uid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
    }
}
exports.default = TuitController;
//# sourceMappingURL=TuitController.js.map