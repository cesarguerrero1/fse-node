"use strict";
/**
 * Cesar Guerrero
 * 10/22/22
 * CS5500 - Fall 2022
 *
 * Assignment 2 - Tuit Schema
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema = new mongoose_1.default.Schema({
    //Recall you cannot make a Tuit without a STRING OF SOME SORT!
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    //Here is how we make two collections talk to each other! NOTE: This syntax
    //is coming from the code we worked on in clas with Prof. Annunziato
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, { collection: 'tuits' });
exports.default = TuitSchema;
//# sourceMappingURL=TuitSchema.js.map