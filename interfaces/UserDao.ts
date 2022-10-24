/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Data Access Object for our User will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

import User from "../models/User";

/**
 * @class userDAO The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface UserDao {

    /**
     * @function findAllUsers Asynchronous function to find all User Objects within a database
     * @return {Promise<User[]>} Returns a Promise that when resolved will contain an array of all the User Objects within the Database
     */
    findAllUsers(): Promise<User[]>; 

    /**
     * @function findUserById Asynchronous function to find a specific User Object within a database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain either a single User Object or a null
     */
    findUserById(uid: string): Promise<any>;

    /**
     * @function createUser Asynchronous function to create a User record within the database
     * @param {User Object} user A User object that you wish to insert into the database
     * @return {Promise<User>}  Returns a Promise that when resolved will contain the newly created User Object
     */
    createUser(user: User): Promise<User>;

    /**
     * @function deleteUser Asynchronous function to delete a User record within the database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
     */
    deleteUser(uid: string): Promise<any>; 

    /**
     * @function updateUser Asynchronous function to find and update a specific User Object within a database
     * @param {String} uid A string that represents the Users unique ID within the database
     * @param {User Object} user A User Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    updateUser(uid: string, user: User): Promise<any>;
    
}

export default UserDao;