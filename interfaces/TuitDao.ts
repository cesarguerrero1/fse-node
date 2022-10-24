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

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   findAllTuits(): Promise<Tuit[]>;

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   findTuitsByUser(uid: string): Promise<Tuit[]>;

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   findTuitById(tid: string): Promise<Tuit>;

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   createTuit(tuit: Tuit): Promise<Tuit>;

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   deleteTuit(tid: string): Promise<any>;

   //JSDOC is not playing nice with interfaces so moved all explanation to the DAO
   updateTuit(tid: string, tuit: Tuit): Promise<any>;
   
}

export default TuitDao;
