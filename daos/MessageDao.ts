/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our Message Collection. The given DAO implements the MessageDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";

/**
 * @class The MessageDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {MessageDaoI}
 */

class MessageDao implements MessageDaoI {

    /**
    * Asynchronous function to create a new Message
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represents a Users unique ID
    * @param {Message} message A Message Object in the form of a JSON object that contains all name-value pairs for information you wish to create
    * @return {Promise<Message>} Returns a Promise that when resolved will contain the newly created Message Object
    */
    async userSendsMessageToUser(uid: string, otherUid: string, message: Message): Promise<Message> {
        return await MessageModel.create(message);
    }

    /**
    * Asynchronous function to find all of the Messages a given user has sent
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Objects that a user has sent
    */
    async findUsersMessagesSent(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).populate("to", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

    /**
    * Asynchronous function to find all of the Messages a given user has received
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Objects that a user has received
    */
    async findUsersMessagesReceived(uid: string): Promise<Message[]> {
        return await MessageModel.find({to: uid}).populate("from", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

    /**
    * Asynchronous function to delete a Message
    * @param {String} mid A string that represents the Message ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Message record
    */ 
    async userDeleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({mid});
    }

    /**
     * Asynchronous function to update an existing Message record
     * @param mid A string representing the actual ID of the Message record
     * @param message A Message Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Message record
     */
    async userEditsMessage(mid: string, message: Message): Promise<any> {
        return await MessageModel.updateOne({_id: mid}, {$set: message});
    }

    /**
    * Asynchronous function to find all the Messages in the database
    * @return {Promise<Message[]>} Returns a Promise that when resolved will contain an array of all the Message Obejcts in the database
    */
    async findAllMessages(): Promise<Message[]> {
        return await MessageModel.find().populate("to", {_id:1, username:1, firstName:1, lastName:1}).populate("from", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

}

export default MessageDao;