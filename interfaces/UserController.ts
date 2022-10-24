/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our UserDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

//We need express in order to make HTTP Requests
import { Request, Response } from "express";

/**
 * @interface UserController The interface contains all of the methods a given Controller will need to implement
 */
interface UserController {
    
    /**
     * @function findAllUsers This function will be delegating the task of finding all the users in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllUsers(req: Request, res: Response): void;

    /**
     * @function findUserById This function will be delegating the task of finding a specific user with the given ID in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findUserById(req: Request, res: Response): void;

    /**
     * @function createUser This function will be delegating the task of creating a new user in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    createUser(req: Request, res: Response): void;

    /**
     * @function deleteuser This function will be delegating the task of deleting a user in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    deleteUser(req: Request, res: Response): void;

    /**
     * @function updateUser This function will be delegating the task of update a specific User record in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    updateUser(req: Request, res: Response): void;
}

export default UserController;