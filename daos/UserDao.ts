/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given User Data Access Object Code
 */

import User from "../models/User";
import UserModel from "../mongoose/UserModel"; //We need the model so we can interact with the Database
import UserDaoI from "../interfaces/UserDao"; //We want all of our DAOs to adhere to the interface

class UserDao implements UserDaoI {
    //From within the User Collection of the database, get all the users
    //NOTE: async at the start of a function FORCES it to return a promise!
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    //From within the User Collection of the database, get a specific User
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    
    //Within the User Collection of the database create a User
    async createUser(user: User): Promise<any> {
        return await UserModel.create(user);
    }

    //Within the User Collection of the database delete a user
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }
    
    ////Within the User Collection of the database update a user
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { set: user });
    }
}

export default UserDao;
