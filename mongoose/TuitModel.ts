/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Tuit Model
 */

import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

const TuitModel = mongoose.model('TuitModel', TuitSchema);

export default TuitModel;