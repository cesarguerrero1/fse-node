"use strict";
/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This file connects our BookmarkSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarkSchema_1 = __importDefault(require("./BookmarkSchema"));
/**
 * Ensure that our model is respecting our Bookmark Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the Bookmark Collection within the database
 */
const BookmarkModel = mongoose_1.default.model('BookmarkModel', BookmarkSchema_1.default);
exports.default = BookmarkModel;
//# sourceMappingURL=BookmarkModel.js.map