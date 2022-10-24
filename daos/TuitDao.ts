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
class TuitDao implements TuitDaoI{

    //JSDOC for this functions is located in the interface
    async findAllTuits(): Promise<Tuit[]>{
        //Search the database and find all Tuit Objects
        return await TuitModel.find();
    }

    //JSDOC for this functions is located in the interface
    async findTuitById(tuitid: string): Promise<any>{
        //Search the database and find the Tuit Object with the given ID
        return await TuitModel.findById(tuitid);
    }

    //JSDOC for this functions is located in the interface
    async findTuitsByUser(userid: string): Promise<Tuit[]>{
        //Search the database and find all Tuit Objects associated with the given user.
        //NOTE: When we find the user, we want to populate their information into the field
        //that normally just contains their ID
        return await TuitModel.find({postedBy: userid}, {_id:0}).populate('postedBy').exec();
    }

    //JSDOC for this functions is located in the interface
    async createTuit(tuit: Tuit): Promise<Tuit>{
        //Insert a new Tuit Object into the database
        return await TuitModel.create(tuit);
    }

    //JSDOC for this functions is located in the interface
    async deleteTuit(tuitid: string): Promise<any>{
        //Delete a Tuit object with the given ID from the database
        return await TuitModel.deleteOne({_id: tuitid});
    }

    //JSDOC for this functions is located in the interface
    async updateTuit(tuitid: string, tuit: Tuit): Promise<any>{
        //Update a Tuit object with the given ID
        return await TuitModel.updateOne({_id: tuitid}, { $set: tuit});
    }
    
}

export default TuitDao;
