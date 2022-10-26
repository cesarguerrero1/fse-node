/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Controller we choose to interact with our FollowDAO will need to implement
 * Having an interface ensures that no matter what Controller we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

 import { Request, Response } from "express";

/**
 * @interface FollowController The interface contains all of the methods a given Controller will need to implement
 */
interface FollowController{
    
    //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
    userFollowsUser(req: Request, res: Response): void;

    userUnfollowsUser(req: Request, res: Response): void;

    findPeopleIFollow(req: Request, res: Response): void;

    findPeopleWhoFollowMe(req: Request, res: Response): void;

    deleteAUsersFollows(req: Request, res: Response): void;

    userRanksFollower(req: Request, res: Response): void;

}

export default FollowController;


