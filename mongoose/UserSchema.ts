/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given Schema Code
 */

import mongoose from "mongoose"; //We need mongoose in order to programmatically interact with Mongo!

//NOTE: A schema controls how data is inputted into a collection of the database
//mongoose.Schema({name:value}, {collection: collectionName})
const UserSchema = new mongoose.Schema({
    //Since this is a schema employing JSON, we need name-value pairs! 
    username: { type: String, required: true },
    password: { type: String, required: true },

    //Basic Info
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
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