/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given Model Code
 */

import mongoose from "mongoose"; 
import UserSchema from "./UserSchema";

//NOTE: Models are how we interact with the database, but we need the schema to ensure we are interacting appropriately
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;