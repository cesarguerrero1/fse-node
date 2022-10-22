"use strict";
/**
 * Cesar Guerrero
 * 10/22/22
 * CS5500 - Fall 2022
 *
 * Assignment 2 - Given Schema Code
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose")); //We need mongoose in order to programmatically interact with Mongo!
//NOTE: A schema controls how data is inputted into a collection of the database
//mongoose.Schema({name:value}, {collection: collectionName})
const UserSchema = new mongoose_1.default.Schema({
    //Since this is a schema employing JSON, we need name-value pairs! 
    username: { type: String, required: true },
    password: { type: String, required: true },
    //Basic Info
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    profilePhoto: String,
    headerImage: String,
    biography: { type: String, default: "" },
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    //Enumerations & Classes
    accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
    maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    }
    //IMPORTANT: This final line is saying that the given schema applies to the 'users' collection
}, { collection: 'users' });
exports.default = UserSchema;
//# sourceMappingURL=UserSchema.js.map