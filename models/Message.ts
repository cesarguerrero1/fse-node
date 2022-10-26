/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the Message Class. Messages are strings sent from one user to another
 */

//Imports
import User from "./User";

/**
 * @class The Message Class is used to implement a typical Message record.One user is able to send
 * a string message to another user.
 */
class Message {
    private messageContent: string;
    private from: User;
    private to: User;
    private sentOn: Date;
}

export default Message;
