/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file allows for the instantiation of a Mongoose Schema Object using a Bookmark Schema
 * that we have defined
 */

import mongoose, { Mongoose } from "mongoose";

/**
 * We are storing the creation of the Mongoose Schema Object within the BookmarkSchema variable. The Schema
 * allows us to enforce how data is allowed to be stored in the database
 * @param {JavascriptObject} schemaObject Object containing name value pairs that represent a schema we want to enforce 
 * @param {JavascriptObject} collectionObject Object containing (1) name-value pair with the name of the collection that this Schema will be defining
 * @returns {MongooseSchemaObject} Returns a Mongoose Schema Object
 */

const BookmarkSchema = new mongoose.Schema({
    bookmarkedTuit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookmarkModel",
        required: true
    },
    bookmarkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookmarkModel",
        required: true
    },
    notes: {
        type: String,
        default: "";
    }
}, { collection: 'bookmarks' })

export default BookmarkSchema;