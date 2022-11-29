/*
* Cesar Guerrero
* 11/28/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

import mongoose from "mongoose";


/**
 * We are storing the creation of the Mongoose Schema Object within the DislikeSchema variable. The Schema
 * allows us to enforce how data is allowed to be stored in the database
 * @param {JavascriptObject} schemaObject Object containing name value pairs that represent a schema we want to enforce 
 * @param {JavascriptObject} collectionObject Object containing (1) name-value pair with the name of the collection that this Schema will be defining
 * @returns {MongooseSchemaObject} Returns a Mongoose Schema Object
 */
const DislikeSchema = new mongoose.Schema({
    tuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TuitModel"
    },
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, { collection: 'dislikes' });

export default DislikeSchema;