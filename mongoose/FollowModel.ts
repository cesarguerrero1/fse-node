/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file connects our FollowSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */

import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";

/**
 * Ensure that our model is respecting our Follow Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the Follow Collection within the database
 */
const FollowModel = mongoose.model('FollowModel', FollowSchema);

export default FollowModel;
