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
 * @file This file stores the User Class
 */
//We are importing data from other files
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * @class The User Class is used to implement a typical user of the application. (Username, password, name, email, etc.)
 */
class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        //Notice the syntax here. We are either accepting a string or a null
        this.profilePhoto = null;
        this.headerImage = null;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        //Here is where we are referencing the Enums and Classes
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.location = null;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map