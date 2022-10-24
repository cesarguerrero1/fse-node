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
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    findAllUsers(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    findUserById(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    createUser(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    deleteUser(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    updateUser(req: Request, res: Response): void;
}

export default UserController;