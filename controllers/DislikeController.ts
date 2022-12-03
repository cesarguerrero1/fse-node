/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

/**
 * @file This file contains the DislikeController Class.
 */

//Imports
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";

/**
 * @class The DislikeController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 */
class DislikeController{

    private app: Express;
    private dislikeDao: DislikeDao;
    private likeDao: LikeDao;
    private tuitDao: TuitDao;

    /**
     * This class will be instantiated within our server file and we will need
     * to connect to our application and DAOs
     * @param app - Instance of our Express Application
     * @param dislikeDao - The instance of our Dislike DAO to interact with the database
     * @param likeDao - The instance of our Like DAO to interact with the database
     * @param tuitDao - The instance of our Tuit DAO to interact with the database
     */
    constructor(app: Express, dislikeDao: DislikeDao, likeDao: LikeDao, tuitDao: TuitDao){
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
     * This function will be delegating the task of finding all the Tuits disliked by a given user
     * to the DAO and then use the DAOs reponse to respond to the front-end
     * @param {RequestObject} req Request Object with a parameter containing the User ID
     * @param {ResponseObject} res Response Object from query which in this case contains a JSON of all Dislikes associated with a given user
     * @return - We are eitehr returning an array containg Tuits or an empty array
     */
    findAllTuitsDislikedByUser = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        let profile: any;
        profile = req.session['profile']
        let userId = uid;

        if(userId === "me" && profile){
            userId = profile._id;
            const dislikes = await this.dislikeDao.findAllTuitsDislikedByUser(userId);
            return res.json(dislikes);
        }else{
            if(userId === "me"){
                return res.json([]);
            }else{
                const dislikes = await this.dislikeDao.findAllTuitsDislikedByUser(userId);
                return res.json(dislikes);
            }
        }
    }

    /**
     * This function calls the DAO to get all the users who have disliked a particular Tuit
     * @param {RequestObject} req - Request Object with a parameter containing the Tuit ID
     * @param {ResponseObject} res - Response Object from query which is a JSON of all Dislikes associated with a given Tuit
     * @return - Either an empty array or an array of Dislikes
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) => {
        this.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid).then((dislikes) => {res.json(dislikes)});
    }

    /**
     * Creating a new Dislike Record in the database
     * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
     * @param {ResponseObject} res - Reponse Object containing a JSON of the newly created Dislike Object
     * @return - The new Dislike Object
     */
    userDislikesTuit = (req: Request, res: Response) => {
        this.dislikeDao.userDislikesTuit(req.params.tid, req.params.uid).then((dislike)=> res.json(dislike));
    }

    /**
     * Deleting a Dislike Record from the database
     * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
     * @param {ResponseObject} res - Response Object containing a status update for the deletion
     * @return - An object containg the status update for the deletion
     */
    userUndislikesTuit = (req: Request, res: Response) => {
        this.dislikeDao.userUndislikesTuit(req.params.tid, req.params.uid).then((dislikeUpdate) => res.json(dislikeUpdate));
    }

    /**
     * Look in the database to see if a user has disliked a particular Tuit
     * @param {RequestObject} req - Request Object with a parameter containing both the User and Tuit ID
     * @param {ResponseObject} res - Response Object containing either nothing or a particular Dislike Object
     * @return - Either returns nothing or a Dislike Object
     */
    findATuitDislikedByUser = (req: Request, res: Response) => {
        this.dislikeDao.findATuitDislikedByUser(req.params.tid, req.params.uid).then((dislike) => res.json(dislike));
    }

    /**
     * Count how many Dislike records are associated with a given Tuit
     * @param {RequestObject} req - Request Object with a parameter containg a Tuit ID
     * @param {ResponseObject}res - Response Object containing an integer of how many records were found
     * @returns - Integer
     */
    countHowManyDislikedTuit(req: Request, res: Response){
        return this.dislikeDao.countHowManyDislikedTuit(req.params.tid).then((count) => res.send(count));
    }

    /**
     * When this function runs, we will be handling the Tuit, the Dislikes, and even the Likes. A Tuit cannot be simultaneously
     * liked and isliked at the same time. When a user Dislikes a Tuit we need to check if they have already disliked the Tuit
     * and react appropriately
     * @param {RequestObject} req - Request object containing the User and Tuit ID
     * @param {ResponseObject} res - Response Object containing the status code for the given request
     * @returns - A given status code indicating the response from the server
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        let profile: any;
        profile = req.session['profile'];
        let userId = uid;
        let status = null;

        if(userId === "me" && profile){
            userId = profile._id;
            status = await this.tuitDislikeHelperFunction(tid, userId);
            if(status === 'success'){
                res.sendStatus(200);
            }else{
                res.sendStatus(404)
            }
        }else{
            if(userId === "me"){
                //You are not logged in
                res.sendStatus(403);
            }else{
                status = await this.tuitDislikeHelperFunction(tid, userId);
                if(status === 'success'){
                    res.sendStatus(200);
                }else{
                    res.sendStatus(404)
                }
            }
        }

    }
    
    /**
     * Just a quick helper function to keep code from getting too unruly
     */
    async tuitDislikeHelperFunction(tid:string, userId: string){
        let tuit: any;

        try{

            //Make sure Tuit exists
            tuit = await this.tuitDao.findTuitById(tid);

            //Grab the the Dislike if it exists and the data associated with it
            const userAlreadyDislikedTuit = await this.dislikeDao.findATuitDislikedByUser(tid, userId);
            const howManyDislikedTuit = await this.dislikeDao.countHowManyDislikedTuit(tid);

            //Check if the user has or has not already Disliked the Tuit
            if(userAlreadyDislikedTuit){
                await this.dislikeDao.userUndislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
            }else{
                //Handle counteracting the possiblity of the user already liking the Tuit
                const userAlreadyLikedTuit = await this.likeDao.findATuitLikedByUser(tid, userId);

                if(userAlreadyLikedTuit){
                    const howManyLikedTuit = await this.likeDao.countHowManyLikedTuit(tid);
                    await this.likeDao.userUnlikesTuit(tid, userId);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }

                await this.dislikeDao.userDislikesTuit(tid, userId);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            }

            await this.tuitDao.updateDislikes(tid, tuit.stats);
            return "success"
        }catch(error){
            return "error"
        }
    }
}

export default DislikeController;