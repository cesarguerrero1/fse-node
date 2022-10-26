/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

import Message from "../models/Message";

/**
 * @file This file contains the interface that the Data Access Object for our Message will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

/**
 * @interface MessageDao The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface MessageDao{

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userSendsMessageToUser(uid: string, otherUid: string): Promise<Message>;

    findUsersMessagesSent(uid: string): Promise<Message[]>;

    findUsersMessagesReceived(uid: string): Promise<Message[]>;

    userDeleteMessage(mid: string): Promise<any>;

    userEditsMessage(mid: string): Promise<any>;

    findAllMessages(): Promise<Message[]>;

}

export default MessageDao;