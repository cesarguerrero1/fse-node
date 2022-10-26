/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file allows for the instantiation of a Mongoose Schema Object using a Follow Schema
 * that we have defined
 */

 import mongoose, { Mongoose } from "mongoose";

 /**
  * We are storing the creation of the Mongoose Schema Object within the FollowSchema variable. The Schema
  * allows us to enforce how data is allowed to be stored in the database
  * @param {JavascriptObject} schemaObject Object containing name value pairs that represent a schema we want to enforce 
  * @param {JavascriptObject} collectionObject Object containing (1) name-value pair with the name of the collection that this Schema will be defining
  * @returns {MongooseSchemaObject} Returns a Mongoose Schema Object
  */
 
 const FollowSchema = new mongoose.Schema({
    userFollowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FollowModel",
        required: true
    },
    userFollowing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FollowModel",
        required: true
    }
 }, { collection: 'follows' })
 
 export default FollowSchema;