/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our TuitDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

import { Request, Response } from "express";

/**
 * @interface TuitController The interface contains all of the methods a given Controller will need to implement
 */
interface TuitController {

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    findAllTuits(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    findTuitById(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    findTuitsByUser(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    createTuit(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    updateTuit(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the Controller
    deleteTuit(req: Request, res: Response): void;
}

export default TuitController;
