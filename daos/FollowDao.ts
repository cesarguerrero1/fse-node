/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our Follow Collection. The given DAO implements the FollowDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";

/**
 * @class The FollowDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {FollowDaoI}
 */
class FollowDao implements FollowDaoI {
    
    /**
    * Asynchronous function to create a new Follow record when a User follows another user
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represent the other Users unique ID
    * @return {Promise<Follow>} Returns a Promise that when resolved will contain the newly created Follow Object
    */
    async userFollowsUser(uid: string, otherUid: string): Promise<Follow> {
        return await FollowModel.create({userFollowed: otherUid, userFollowing: uid});
    }

    /**
    * Asynchronous function to delete an existing Follow record
    * @param {String} uid A string that represents a Users unique ID
    * @param {String} otherUid A string that represent the other Users unique ID
    * @return {Promise<any>}  Returns a Promise that when resolved will contain a status update for the deletion of the Follow record
    */ 
    async userUnfollowsUser(uid: string, otherUid: string): Promise<any> {
        return await FollowModel.deleteOne({userFollowed: otherUid, userFollowing: uid});
    }

    /**
    * Asynchronous function to find all the people a given User follows
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Follow[]>} Returns a Promise that when resolved will contain an array of all the Follow Objects associated with the User
    * where the User "follows" another user
    */
    async findPeopleIFollow(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowing: uid}).populate("userFollowing").populate("userFollowed").exec();
    }

    /**
    * Asynchronous function to find all the people who follow a given user
    * @param {String} uid The ID of the user we are interesed in
    * @return {Promise<Follow[]>} Returns a Promise that when resolved will contain an array of all the Follow Objects associated with the User
    * where the User "is being followed" by anotehr user
    */
    async findPeopleWhoFollowMe(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).populate("userFollowing").populate("userFollowed").exec();
    }

    /**
    * Asynchronous function to delete all eixisting Follow records associated with a given user
    * @param {String} uid A string that represents a Users unique ID
    * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the deletion of the Follow record
    */
    async deleteAUsersFollows(uid: string): Promise<any> {
        return await FollowModel.deleteMany({$or: [{userFollowed: uid}, {userFollowing: uid}]});
    }

    /**
     * Asynchronous function to update an existing Follows record with a ranking for the follower
     * @param fid A string representing the actual ID of the Follow record
     * @param follow A Follow Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a status update for the updating of the Follow record
     */
    async userRanksFollower(fid: string, follow: Follow): Promise<any> {
        return await FollowModel.updateOne({_id: fid}, { $set: follow})
    }
}

export default FollowDao;