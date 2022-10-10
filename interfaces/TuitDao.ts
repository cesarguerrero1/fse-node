/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Tuit DAO Interface
 */

import Tuit from "../models/Tuit";

interface TuitDao {

   findAllTuits(): Promise<Tuit[]>; //Return an array of all Tuits
   findTuitsByUser(uid: string): Promise<Tuit[]>; //Return an array of Tuits from a specific user
   findTuitById(tid: string): Promise<Tuit>; //Find a specific Tuit
   createTuit(tuit: Tuit): Promise<Tuit>; //Create a Tuit
   updateTuit(tid: string, tuit: Tuit): Promise<any>; //Attempt to update a Tuit
   deleteTuit(tid: string): Promise<any>; //Attempt to delete a Tuit
   
}

export default TuitDao;
