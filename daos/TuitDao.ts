/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our Tuit Collection. The given DAO implements the TuitDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

//Imports
import Tuit from "../models/Tuit"
import TuitModel from "../mongoose/TuitModel"
import TuitDaoI from "../interfaces/TuitDao"

/**
 * @class The TuitDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {TuitDaoI}
 */
class TuitDao implements TuitDaoI {

    /**
    * Asynchronous function to find all Tuit Objects within a database
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects within the Database
    */
    async findAllTuits(): Promise<Tuit[]> {
        //Search the database and find all Tuit Objects
        return await TuitModel.find().populate("postedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
    }

    /**
    * Asynchronous function to find all Tuit Objects belonging to a given User
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects belonging to the User with the given unique ID
    */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        //Search the database and find all Tuit Objects associated with the given user.
        //NOTE: When we find the user, we want to populate their information into the field
        //that normally just contains their ID
        return await TuitModel.find({ postedBy: uid }).populate('postedBy').exec();
    }

    /**
    * Asynchronous function to find a specific Tuit Object within a database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<Tuit>} Returns a Promise that when resolved will contain a single Tuit object
    */
    async findTuitById(tid: string): Promise<Tuit> {
        //Search the database and find the Tuit Object with the given ID
        return await TuitModel.findById(tid).populate("postedBy", { _id: 1, username: 1, firstName: 1, lastName: 1 }).exec();
    }

    /**
    * Asynchronous function to create a Tuit record within the database
    * @param {TuitObject} tuit A Tuit object that you wish to insert into the database
    * @return {Promise<Tuit>}  Returns a Promise that when resolved will contain the newly created Tuit Object
    */
    async createTuitByUser(uid:string, tuit: Tuit): Promise<Tuit> {
        //Insert a new Tuit Object into the database
        return await TuitModel.create(tuit);
    }

    /**
    * Asynchronous function to delete a Tuit record within the database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
    */
    async deleteTuit(tid: string): Promise<any> {
        //Delete a Tuit object with the given ID from the database
        return await TuitModel.deleteOne({ _id: tid });
    }

    /**
    * Asynchronous function to find and update a specific Tuit Object within a database
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {TuitObject} tuit A Tuit Object in the form of a JSON object that contains all name-value pairs for information you wish to update
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
    */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        //Update a Tuit object with the given ID
        return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
    }

    /**
     * Async function to update the tuit stats - This should only be used when liking a Tuit
     * @param {String} tid A string that represents the unique ID of the Tuit within the database
     * @param {Object} newStats -   An object containing the new like and dislike count
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    async updateLikes(tid: string, newStats: {}): Promise<any>{
        return await TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}})
    }
    
    /**
     * Async function to update the tuit stats - This should only be used when disliking a Tuit
     * @param {String} tid A string that represents the unique ID of the Tuit within the database
     * @param {Object} newStats - An object containing the new like and dislike count
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    async updateDislikes(tid: string, newStats: {}): Promise<any>{
        return await TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}})
    }

}

export default TuitDao;