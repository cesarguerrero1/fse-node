"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This file connects our UserSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */
//Import the Mongoose Library and our defined User Schema
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
/**
 * Ensure that our model is respecting our User Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the User Collection within the database
 */
const UserModel = mongoose_1.default.model('UserModel', UserSchema_1.default);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map