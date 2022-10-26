/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the Bookmark Class. Users are able to bookmark another Tuit
 */

//Imports
import User from "./User";
import Tuit from "./Tuit";

/**
 * @class The Bookmark class is used to implement a typical Bookmark record. A given 
 * user can bookmark a given Tuit so they can easily revisit that Tuit later
 */
class Bookmark{
    bookmarkedTuit: Tuit;
    bookmarkedBy: User;
}

export default Bookmark;