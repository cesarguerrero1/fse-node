/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

import Follow from "../models/Follow";

/**
 * @file This file contains the interface that the Data Access Object for our Follow will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

/**
 * @interface FollowDao The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface FollowDao{
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userFollowsUser(uid: string, otherUid: string): Promise<Follow>;

    userUnfollowsUser(uid: string, otherUid: string): Promise<any>;

    findPeopleIFollow(uid: string): Promise<Follow[]>;

    findPeopleWhoFollowMe(uid: string): Promise<Follow[]>;

    deleteAUsersFollows(uid: string): Promise<any>;

    userRanksFollower(fid: string, follow: Follow): Promise<any>;

}

export default FollowDao;