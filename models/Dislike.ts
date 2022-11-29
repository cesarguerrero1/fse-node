/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

/**
 * @file This file stores the Dislike Class. Dislikes are linked to both Users and Tuits
 */

import Tuit from "./Tuit";
import User from "./User";

/**
 * @class The Dislike Class is used to implement a typical Dislike record. A dislike record contains the
 * user as well as the Tuit that they 'disliked'
 */
class Dislike{
    private tuit: Tuit;
    private dislikedBy: User;
}

export default Dislike;