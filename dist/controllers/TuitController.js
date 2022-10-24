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
        //JSDOC for this functions is located in the interface
        this.findAllTuits = (req, res) => {
            //As defined in the constructor, this function is called when a given HTTP request occurs
            //In this case the program is attempting to see all the Tuits in our database so we call
            //on the DAO to do the heavy lifting. Once the work is done, we consume the Promise and display
            //the content to the user
            this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
        };
        //JSDOC for this functions is located in the interface
        this.findTuitById = (req, res) => {
            //The ID for the Tuit is provided within the parameters field within the request object
            this.tuitDao.findTuitById(req.params.tuitid).then((tuit) => res.json(tuit));
        };
        //JSDOC for this functions is located in the interface
        this.findTuitsByUser = (req, res) => {
            this.tuitDao.findTuitsByUser(req.params.userid).then((tuits) => res.json(tuits));
        };
        //JSDOC for this functions is located in the interface
        this.createTuit = (req, res) => {
            //Since we are creating a Tuit (whose information is stored in an object) we need
            //to include that object within the body of the request as opposed to the parameters
            this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
        };
        //JSDOC for this functions is located in the interface
        this.deleteTuit = (req, res) => {
            this.tuitDao.deleteTuit(req.params.tuitid).then((status) => res.json(status));
        };
        //JSDOC for this functions is located in the interface
        this.updateTuit = (req, res) => {
            this.tuitDao.updateTuit(req.params.tuitid, req.body).then((status) => res.json(status));
        };
        this.app = app;
        this.tuitDao = tuitDao;
        //HTTP Listeners
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitid', this.findTuitById);
        this.app.get('/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tuitid', this.deleteTuit);
        this.app.put('/tuits/:tuitid', this.updateTuit);
    }
}
exports.default = TuitController;
//# sourceMappingURL=TuitController.js.map