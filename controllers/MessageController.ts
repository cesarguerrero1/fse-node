/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the MessageController Class that connects the middle tier to the client.
 */

//Imports
import { Request, Response, Express } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

/**
 * @class The MessageController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {MessageControllerI}
 */
class MessageController implements MessageControllerI{

    private app: Express;
    private messageDao: MessageDao;

    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param messageDao The DAO that will allow us to interact with the database
     */
    constructor(app: Express, messageDao: MessageDao) {
        this.app = app;
        this.messageDao = messageDao;

        //HTTP Listeners
        this.app.get();
        this.app.get();
        this.app.post();
        this.app.delete();
    }
        
}

export default MessageController;