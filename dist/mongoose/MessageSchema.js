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
 * @file This file allows for the instantiation of a Mongoose Schema Object using a Message Schema
 * that we have defined
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * We are storing the creation of the Mongoose Schema Object within the MessageSchema variable. The Schema
 * allows us to enforce how data is allowed to be stored in the database
 * @param {JavascriptObject} schemaObject Object containing name value pairs that represent a schema we want to enforce
 * @param {JavascriptObject} collectionObject Object containing (1) name-value pair with the name of the collection that this Schema will be defining
 * @returns {MongooseSchemaObject} Returns a Mongoose Schema Object
 */
const MessageSchema = new mongoose_1.default.Schema({
    messageContent: { type: String, required: true },
    to: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MessageModel",
        required: true
    },
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MessageModel",
        required: true
    },
    sentOn: { type: Date, default: Date.now() }
}, { collection: 'messages' });
exports.default = MessageSchema;
//# sourceMappingURL=MessageSchema.js.map