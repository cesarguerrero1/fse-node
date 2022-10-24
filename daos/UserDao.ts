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
    
    //JSDOC for this functions is located in the interface
    async findAllUsers(): Promise<User[]> {
        //Search the database and find all User Objects
        return await UserModel.find();
    }

    //JSDOC for this functions is located in the interface
    async findUserById(uid: string): Promise<any> {
        //Search the database and find the User Object with the given ID
        return await UserModel.findById(uid);
    }
    
    //JSDOC for this functions is located in the interface
    async createUser(user: User): Promise<User> {
        //Insert a new User Object into the database
        return await UserModel.create(user);
    }

    //JSDOC for this functions is located in the interface
    async deleteUser(uid: string): Promise<any> {
        //Delete a User object with the given ID from the database
        return await UserModel.deleteOne({ _id: uid });
    }
    
    //JSDOC for this functions is located in the interface
    async updateUser(uid: string, user: User): Promise<any> {
        //Update a User object with the given ID
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
}

export default UserDao;
