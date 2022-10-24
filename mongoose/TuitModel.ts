/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file connects our TuitSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */

//Importing the Mongoose Library and our defined Tuit Schema
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * Ensure that our model is respecting our Tuit Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the Tuit Collection within the database
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);

export default TuitModel;