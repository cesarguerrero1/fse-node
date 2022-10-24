/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the Data Access Object for our User Collection. The given DAO implements the UserDao Interface that we 
 * specified in another file. This DAO is what allows us to wrap all of the lower-level database operations
 */

//Imports
import User from "../models/User";
import UserModel from "../mongoose/UserModel"; //We need the model so we can interact with the Database
import UserDaoI from "../interfaces/UserDao"; //We want all of our DAOs to adhere to the interface

/**
 * @class The UserDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {UserDaoI}
 */
class UserDao implements UserDaoI {
    
    /**
     * Asynchronous function to find all User Objects within a database
     * @return {Promise<User[]>} Returns a Promise that when resolved will contain an array of all the User Objects within the Database
     */
    async findAllUsers(): Promise<User[]> {
        //Search the database and find all User Objects
        return await UserModel.find();
    }

    /**
     * Asynchronous function to find a specific User Object within a database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain either a single User Object or a null
     */
    async findUserById(uid: string): Promise<any> {
        //Search the database and find the User Object with the given ID
        return await UserModel.findById(uid);
    }
    
    /**
     * Asynchronous function to create a User record within the database
     * @param {UserObject} user A User object that you wish to insert into the database
     * @return {Promise<User>}  Returns a Promise that when resolved will contain the newly created User Object
     */
    async createUser(user: User): Promise<User> {
        //Insert a new User Object into the database
        return await UserModel.create(user);
    }

    /**
     * Asynchronous function to delete a User record within the database using their ID
     * @param {String} uid A string that represents the Users unique ID within the database
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
     */
    async deleteUser(uid: string): Promise<any> {
        //Delete a User object with the given ID from the database
        return await UserModel.deleteOne({ _id: uid });
    }
    
    /**
     * Asynchronous function to find and update a specific User Object within a database
     * @param {String} uid A string that represents the Users unique ID within the database
     * @param {UserObject} user A User Object in the form of a JSON object that contains all name-value pairs for information you wish to update
     * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
     */
    async updateUser(uid: string, user: User): Promise<any> {
        //Update a User object with the given ID
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
}

export default UserDao;
