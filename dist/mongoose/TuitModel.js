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
 * @file This file connects our TuitSchema to the Mongoose Model. The Mongoose Model
 * allows us to perform CRUD operations and interact with our Mongo Database BUT our Schema ensures
 * that we are ineracting appropriately
 */
//Importing the Mongoose Library and our defined Tuit Schema
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema_1 = __importDefault(require("./TuitSchema"));
/**
 * Ensure that our model is respecting our Tuit Schema
 * @param {string} singularCollectionName Singular name of the collection in your database
 * @param {MongooseSchemaObject} mongooseSchemaObject Schema Object to ensure appropriate and valid database manipulation
 * @returns {MongooseModelObject} Model Object that will allow us to perform CRUD operations on the Tuit Collection within the database
 */
const TuitModel = mongoose_1.default.model('TuitModel', TuitSchema_1.default);
exports.default = TuitModel;
//# sourceMappingURL=TuitModel.js.map