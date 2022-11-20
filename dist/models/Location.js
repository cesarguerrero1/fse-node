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
 * @file This file  stores the Location Class. Location Objects are instantiated everytime a
 * User Object is created.
 */
/**
 * @class The Location Class contains Latitude and Longitude properties. We implement the Location
 * as a class instead of say a string becuase this way we can group and edit the properties seamlessly
 */
class Location {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }
}
;
exports.default = Location;
//# sourceMappingURL=Location.js.map