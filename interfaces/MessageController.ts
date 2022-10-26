/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our MessageDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

 import { Request, Response } from "express";

/**
 * @interface MessageController The interface contains all of the methods a given Controller will need to implement
 */
interface MessageController{

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userSendsMessageToUser(req: Request, res: Response): void;

    findUsersMessagesSent(req: Request, res: Response): void;

    findUsersMessagesReceived(req: Request, res: Response): void;

    userDeleteMessage(req: Request, res: Response): void;

    userEditsMessage(req: Request, res: Response): void;

    findAllMessages(req: Request, res: Response): void;

}

export default MessageController;


