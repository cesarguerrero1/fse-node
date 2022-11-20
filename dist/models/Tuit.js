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
 * @class The Tuit Class is used to implement a typical Tuit that can be created within the
 * application (Tuit String, postedOn Date, postedBy Who)
 */
class Tuit {
    constructor() {
        this.tuit = ''; //When users make a Tuit they need to provide a string
        this.postedOn = new Date(); //Each Tuit needs to have a timestamp of when it was created
        this.postedBy = null; //Each Tuit has a User associated with them
        this.stats = null; //Each Tuit has stats associated with it
    }
}
exports.default = Tuit;
//# sourceMappingURL=Tuit.js.map