/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

/**
 * @file This file connects our DislikeSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */

import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

/**
 * Ensure that our model is respecting our Disike Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the Tuit Collection within the database
 */
const DislikeModel = mongoose.model('DislikeModel', DislikeSchema);

export default DislikeModel;