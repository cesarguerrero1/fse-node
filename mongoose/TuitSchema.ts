/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Tuit Schema
 */

import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema({
    //Recall you cannot make a Tuit without a STRING OF SOME SORT!
    tuit: {type: String, required: true},
    postedOn: { type: Date, default: Date.now },
    //Here is how we make two collections talk to each other! NOTE: This syntax
    //is coming from the code we worked on in clas with Prof. Annunziato
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
},{collection: 'tuits'});

export default TuitSchema