/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the Follow Class. Follows  are linked to (2) Users
 */

//Imports
import User from "./User";

/**
 * @class The Follow Class is used to implement a typical Follow record. A Follow record contains (2) users. One who
 * is following another user and the user that is being followed. 
 */
class Follow {  
    private userFollowed: User;
    private userFollowing: User;
    private rank: Number | null = null;
}

export default Follow;
