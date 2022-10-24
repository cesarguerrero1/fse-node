/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file allows for the instantiation of a Mongoose Schema Object using a User Schema
 * that we have defined
 */

import mongoose from "mongoose"; //We need mongoose in order to programmatically interact with Mongo!

/**
 * We are storing the creation of the Mongoose Schema Object within the UserSchema variable. The Schema
 * allows us to enforce how data is allowed to be stored in the database
 * @param {JavascriptObject} schemaObject Object containing name value pairs that represent a schema we want to enforce 
 * @param {JavascriptObject} collectionObject Object containing (1) name-value pair with the name of the collection that this Schema will be defining
 * @returns {MongooseSchemaObject} Returns a Mongoose Schema Object
 */
const UserSchema = new mongoose.Schema({
    //Since this is a schema employing JSON, we need name-value pairs! 
    username: { type: String, required: true },
    password: { type: String, required: true },

    //Basic Info
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    profilePhoto: { type: String, default: null},
    headerImage: { type: String, default: null},
    biography: { type: String, default: "" },
    dateOfBirth: { type: String, default: null},
    joined: { type: Date, default: Date.now },
    
    //Enumerations & Classes
    accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
    maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    }
    
    //IMPORTANT: This final line is saying that the given schema applies to the 'users' collection
}, { collection: 'users' });

export default UserSchema;