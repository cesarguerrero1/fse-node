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
 * @interface userDAO The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface UserDao {

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findAllUsers(): Promise<User[]>; 

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findUserById(uid: string): Promise<any>;

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    createUser(user: User): Promise<User>;

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    deleteUser(uid: string): Promise<any>; 

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    updateUser(uid: string, user: User): Promise<any>;
    
}

export default UserDao;