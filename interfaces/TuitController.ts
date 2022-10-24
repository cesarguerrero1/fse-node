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

    /**
     * @function findAllTuits This function will be delegating the task of finding all the Tuits in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findAllTuits(req: Request, res: Response): void;

    /**
     * @function findTuitById This function will be delegating the task of finding a given Tuit using its ID within the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findTuitById(req: Request, res: Response): void;

    /**
     * @function findTuitsByUser This function will be delegating the task of finding all the Tuits belonging to a given User in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    findTuitsByUser(req: Request, res: Response): void;

    /**
     * @function createTuit This function will be delegating the task of creating a new Tuit in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    createTuit(req: Request, res: Response): void;

    /**
     * @function updateTuit This function will be delegating the task of updating a Tuit record in the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    updateTuit(req: Request, res: Response): void;

    /**
     * @function deleteTuit This function will be delegating the task of deleting a Tuit record from the database
     * to the DAO and once the DAO returns the appropriate data the controller will do the rest
     * @param {Request Object} req When we call this function we will be providing a Request Object where we can store things like query parameters
     * @param {Response Object} res When we call this function we will be providing a Response Object which is where the response from database will be stored
     * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
     * as we will likely just programatically display the content on the screen
     */
    deleteTuit(req: Request, res: Response): void;
}

export default TuitController;
