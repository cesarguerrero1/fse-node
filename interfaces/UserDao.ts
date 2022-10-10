/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given DAO Interace Code
 */

//NOTE: As we learned in class, making a Data Access Object (DAO) Interface ensures that if we change
//our database type (XML, Mongo, CSV), things will not break!

//We are importing this because our DAO says we will directly be interacting with our User
import User from "../models/User";

interface UserDao {
    
    //When we interact with the database, the return is a PROMISE
    findAllUsers(): Promise<User[]>; //Return an array of User Objects
    findUserById(uid: string): Promise<any>; //Return a User or null if they don't exist
    createUser(user: User): Promise<User>; //Create a user in the database using the information from a User Object
    updateUser(uid: string, user: User): Promise<any>; //Attempt to update a user assuming they exist
    deleteUser(uid: string): Promise<any>; //Attempt to delete a user assuming they exist
    
}

export default UserDao;