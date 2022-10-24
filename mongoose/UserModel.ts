/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file connects our UserSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */

//Import the Mongoose Library and our defined User Schema
import mongoose from "mongoose"; 
import UserSchema from "./UserSchema";

/**
 * Ensure that our model is respecting our User Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the User Collection within the database
 */
const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;