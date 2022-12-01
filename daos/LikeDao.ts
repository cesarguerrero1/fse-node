/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our Like Collection. The given DAO implements the LikeDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDao";

/**
 * @class The LikeDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {LikeDaoI}
 */

class LikeDao implements LikeDaoI{

    /**
    * Asynchronous function to find all Tuits liked by a given User
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Like[]>} Returns a Promise that when resolved will contain an array of all the Like Objects associated with the User
    */
    async findAllTuitsLikedByUser (uid: string): Promise<Like[]>{
        return await LikeModel.find({likedBy: uid}).populate({path:"tuit", populate:{path: "postedBy"}}).populate("likedBy").exec();
    }

    /**
    * Asynchronous function to find all the users that liked a given Tuit
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<Like[]>} Returns a Promise that when resolved will contain an array of all Like Objects associated with a given Tuit
    */
    async findAllUsersThatLikedTuit (tid: string): Promise<Like[]>{
        return await LikeModel.find({tuit: tid}).populate("tuit",  {_id:1, tuit:1, postedOn:1}).populate("likedBy", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

    /**
    * Asynchronous function to create a new Like record when a User likes a Tuit
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<Like>} Returns a Promise that when resolved will contain the newly created Like Object
    */
    async userLikesTuit (tid: string, uid: string): Promise<Like>{
        return await LikeModel.create({tuit: tid, likedBy: uid});
    }

    /**
    * Asynchronous function to delete an existing like record
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Like record
    */ 
    async userUnlikesTuit (tid: string, uid: string): Promise<any>{
        return await LikeModel.deleteOne({tuit:tid, likedBy:uid});
    }

    /**
     * Async function to find a given Tuit Disliked by a given User
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain either nothing or a given Like Record
     */
    async findATuitLikedByUser(tid: string, uid: string): Promise<any>{
        return await LikeModel.findOne({tuit:tid, likedBy: uid});
    }

    /**
     * Async function to count how many Like Records exist for a given Tuit
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @returns {Promise<any>} - An integer count of how many Dislike Records exist 
     */
    async countHowManyLikedTuit(tid: string): Promise<any>{
        return await LikeModel.count({tuit:tid});
    }
    
}

export default LikeDao;