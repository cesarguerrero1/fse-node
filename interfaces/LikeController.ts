/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our LikeDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

 import { Request, Response } from "express";

/**
 * @interface LikeController The interface contains all of the methods a given Controller will need to implement
 */
interface LikeController{
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    findAllUsersThatLikedTuit(req: Request, res: Response): void;

    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userLikesTuit(req: Request, res: Response): void;
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userUnlikesTuit(req: Request, res: Response): void;

}

export default LikeController;


