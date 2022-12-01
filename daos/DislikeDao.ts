/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

/**
 * @file This file contains the DislikeDao Class
 */

import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";

/**
 * @class The DislikeDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 */
class DislikeDao{

    /**
     * Async function to find all Tuits disliked by a given User
     * @param uid - The ID of a user we are interested in
     * @returns {Promise<Dislike[]>} - Returns a Promise that when resolved will contain an array of Dislikes
     */
    async findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>{
        return await DislikeModel.find({dislikedBy: uid}).populate("tuit", {_id:1, tuit:1, postedOn:1}).exec();
    }

    /**
     * Async function to find all the users that disliked a given Tuit
     * @param {string} tid - The id of a given Tuit
     * @returns {Promise<Dislike[]>} - Returns a Promise that when resolved will contain an array of Dislikes
     */
    async findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>{
        return await DislikeModel.find({tuit: tid}).populate("tuit",  {_id:1, tuit:1, postedOn:1}).populate("dislikedBy", {_id:1, username:1, firstName:1, lastName:1}).exec();
    }

    /**
     * Async function to create a new Dislike Record
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<Dislike>} - Returns a promise that when resolved will contain the newly created Dislike Object
     */
    async userDislikesTuit(tid: string, uid:string): Promise<Dislike>{
        return await DislikeModel.create({tuit:tid, dislikedBy: uid});
    }

    /**
     * Async function to delete a Dislike Record
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain a status update for the deletion
     */
    async userUndislikesTuit(tid: string, uid: string): Promise<any>{
        return await DislikeModel.deleteOne({tuit:tid, dislikedBy:uid});
    }

    /**
     * Async function to find a given Tuit Disliked by a given User
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @param uid - A string that represents the ID for the User associated with this record
     * @returns {Promise<any>} - Returns a Promise that when resolved will contain either nothing or a given Dislike Record
     */
    async findATuitDislikedByUser(tid:string, uid:string): Promise<any>{
        return await DislikeModel.findOne({tuit:tid, dislikedBy: uid});
    }

    /**
     * Async function to count how many Dislike Records exist for a given Tuit
     * @param tid - A string that represents the ID for the Tuit associated with this record
     * @returns {Promise<any>} - An integer count of how many Dislike Records exist 
     */
    async countHowManyDislikedTuit(tid:string): Promise<any>{
        return await DislikeModel.count({tuit:tid});
    }

}

export default DislikeDao;