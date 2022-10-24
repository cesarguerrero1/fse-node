/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file contains the interface that the Data Access Object for our Tuit will need to implement
 * Having an interface ensures that no matter what DAO we choose to use, the rest of the code higher-level code will 
 * not need to be entirely reconfigured 
 */

import Tuit from "../models/Tuit";

/**
 * @interface TuitDAO The interface contains all of the methods a given DAO will need to implement as well as the return types
 * for each method
 */
interface TuitDao {

   /**
    * @function findAllTuits Asynchronous function to find all Tuit Objects within a database
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects within the Database
    */
   findAllTuits(): Promise<Tuit[]>;

   /**
    * @function findTuitsByUser Asynchronous function to find all Tuit Objects belonging to a given User
    * @param {String} uid A string that represent the Users unique ID
    * @return {Promise<Tuit[]>} Returns a Promise that when resolved will contain an array of all the Tuit Objects belonging to the User with the given unique ID
    */
   findTuitsByUser(uid: string): Promise<Tuit[]>;

   /**
    * @function findTuitById Asynchronous function to find a specific Tuit Object within a database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<Tuit>} Returns a Promise that when resolved will contain a single Tuit object
    */
   findTuitById(tid: string): Promise<Tuit>;

   /**
    * @function createTuit Asynchronous function to create a Tuit record within the database
    * @param {Tuit Object} tuit A Tuit object that you wish to insert into the database
    * @return {Promise<Tuit>}  Returns a Promise that when resolved will contain the newly created Tuit Object
    */   
   createTuit(tuit: Tuit): Promise<Tuit>; //Create a Tuit

   /**
    * @function deleteTuit Asynchronous function to delete a Tuit record within the database using its ID
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted deletion
    */
   deleteTuit(tid: string): Promise<any>; //Attempt to delete a Tuit

   /**
    * @function updateTuit Asynchronous function to find and update a specific Tuit Object within a database
    * @param {String} tid A string that represents the unique ID of the Tuit within the database
    * @param {Tuit Object} tuit A Tuit Object in the form of a JSON object that contains all name-value pairs for information you wish to update
    * @return {Promise<any>} Returns a Promise that when resolved will contain a JSON object with an update about the attempted update
    */
   updateTuit(tid: string, tuit: Tuit): Promise<any>; //Attempt to update a Tuit
   
}

export default TuitDao;
