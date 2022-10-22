"use strict";
/**
 * Cesar Guerrero
 * 10/09/22
 * CS5500 - Fall 2022
 *
 * Assignemnt 1 - Given Code
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Tuit {
    constructor() {
        this.tuit = ''; //When users make a Tuit they need to provide a string
        this.postedOn = new Date(); //Each Tuit needs to have a timestamp of when it was created
        this.postedBy = null; //Each Tuit has a User associated with them
    }
}
exports.default = Tuit;
//# sourceMappingURL=Tuit.js.map