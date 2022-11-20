"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This file stores an enum representing the type of account a user can have (Personal, Academic, Professional)
 * If you wanted to start implementing things like administrators, you would add more options to this enum
 */
/**
 * @enum A user's account type will fall into one of the choices below
 */
var AccountType;
(function (AccountType) {
    AccountType["Personal"] = "PERSONAL";
    AccountType["Academic"] = "ACADEMIC";
    AccountType["Professional"] = "PROFESSIONAL";
})(AccountType || (AccountType = {}));
;
exports.default = AccountType;
//# sourceMappingURL=AccountType.js.map