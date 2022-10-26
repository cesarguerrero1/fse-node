/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

import Like from "../models/Like";

/**
 * @file This file contains the interface that the Data Access Object for our Like will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

/**
 * @interface LikeDao The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface LikeDao{

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userLikesTuit (tid: string, uid: string): Promise<Like>;
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userUnlikesTuit (tid: string, uid: string): Promise<any>;

}

export default LikeDao;