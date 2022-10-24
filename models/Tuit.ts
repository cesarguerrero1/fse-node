/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the Tuit Class. Notice that Tuits are LINKED to Users
 */


import User from "./User";

/**
 * @class The Tuit Class is used to implement a typical Tuit that can be created within the 
 * application (Tuit String, postedOn Date, postedBy Who)
 */
class Tuit {
    private tuit: string = ''; //When users make a Tuit they need to provide a string
    private postedOn: Date = new Date(); //Each Tuit needs to have a timestamp of when it was created
    private postedBy: User | null=null; //Each Tuit has a User associated with them
}

export default Tuit