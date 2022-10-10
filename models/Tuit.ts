/**
 * Cesar Guerrero
 * 10/09/22
 * CS5500 - Fall 2022
 * 
 * Assignemnt 1 - Given Code
 */

import User from "./User";

class Tuit {
    private tuit: string = ''; //When users make a Tuit they need to provide a string
    private postedOn: Date = new Date(); //Each Tuit needs to have a timestamp of when it was created
    private postedBy: User | null=null; //Each Tuit has a User associated with them
}

export default Tuit