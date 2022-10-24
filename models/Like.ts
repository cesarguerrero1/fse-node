/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the Like Class. Likes are linked to both Users and Tuits
 */

//Imports
import Tuit from "./Tuit";
import User from "./User";

/**
 * @class The Like Class is used to implement a typical Like record. A like record contains the user
 * as well as the Tuit that they 'liked'
 */
class Like {  
    tuit: Tuit;
    likedBy: User;
}

export default Like;
