/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the LikeController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import LikeControllerI from "../interfaces/LikeController";

/**
 * @class The LikeController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {LikeControllerI}
 */
class LikeController implements LikeControllerI{

    private app: Express;
    private likeDao: LikeDao;
    private tuitDao: TuitDao;

    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param LikeDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, likeDao: LikeDao, tuitDao: TuitDao) {
        this.app = app;
        this.likeDao = likeDao;
        this.tuitDao = tuitDao;

        //HTTP Listeners
        this.app.get('/users/:uid/likes', this.findAllTuitsLikedByUser);
        this.app.get('/tuits/:tid/likes', this.findAllUsersThatLikedTuit);
        this.app.post('/users/:uid/likes/:tid', this.userLikesTuit);
        this.app.delete('/users/:uid/likes/:tid', this.userUnlikesTuit);
        this.app.put('/users/:uid/likes/:tid', this.userTogglesTuitLikes);
    }

    /**
     * This function will be delegating the task of finding all the Tuits liked by a given user in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the User ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Likes associated with a given user
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllTuitsLikedByUser = (req: Request, res: Response) => {
        this.likeDao.findAllTuitsLikedByUser(req.params.uid).then((likes) => res.json(likes));
    }

    /**
     * This function will be delegating the task of finding all the users who have ever liked a given Tuit in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing the Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Likes associated with a given Tuit
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) => {
        this.likeDao.findAllUsersThatLikedTuit(req.params.tid).then((likes) => res.json(likes));
    }

    /**
     * This function will be delegating the task of creating a new Like Object
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing both a User ID and Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Like record
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    userLikesTuit = (req: Request, res: Response) => {
        this.likeDao.userLikesTuit(req.params.tid, req.params.uid).then((likes) => res.json(likes));
    }

    /**
     * This function will be delegating the task of deleting a Like record from within the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {RequestObject} req Request Object with a parameter containing both a User ID and Tuit ID
     * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    userUnlikesTuit = (req: Request, res: Response) => {
        this.likeDao.userUnlikesTuit(req.params.tid, req.params.uid).then((likes) => res.json(likes));
    }

    //New Function
    findATuitLikedByUser(req: Request, res: Response){
        return this.likeDao.findATuitLikedByUser(req.params.tid, req.params.uid).then((like) => res.json(like));
    }

    //New Function
    countHowManyLikedTuit(req: Request, res: Response){
        return this.likeDao.countHowManyLikedTuit(req.params.tid).then((count) => res.send(count));
    }

    //New Function
    userTogglesTuitLikes = async(req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        let profile: any;
        profile = req.session['profile'];
        const userId = uid === "me" && profile ? profile._id : uid;
        try{
            const userAlreadyLikedTuit = await this.likeDao.findATuitLikedByUser(tid, userId);
            const howManyLikedTuit = await this.likeDao.countHowManyLikedTuit(tid);
            let tuit: any; 
            tuit = await this.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
                await this.likeDao.userUnlikesTuit(tid, userId);
                tuit.stats.likes = howManyLikedTuit - 1;
            }else {
                await this.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };
            //After we either liked or unliked a Tuit, update the stats for that Tuit
            await this.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        }catch(e){
            res.sendStatus(404);
        }
    }
        
}

export default LikeController;