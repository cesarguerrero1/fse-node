"use strict";
/**
 * Cesar Guerrero
 * 10/09/22
 * CS5500 - Fall 2022
 *
 * Assignemnt 1 - Given Code
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//We are importing data from other files
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
//Users on Tuiter have basic information associated with them
class User {
    constructor() {
        //Note the syntax! If a firstname is not provide, then just make it null
        this.username = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.biography = '';
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