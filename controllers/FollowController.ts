/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the FollowController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class The FollowController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {FollowControllerI}
 */
class FollowController implements FollowControllerI{

    private app: Express;
    private followDao: FollowDao;

    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param followDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, followDao: FollowDao) {
        this.app = app;
        this.followDao = followDao;

        //HTTP Listeners
        this.app.get();
        this.app.get();
        this.app.post();
        this.app.delete();
    }
        
}

export default FollowController;