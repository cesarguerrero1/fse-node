/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores the User Class
 */

//We are importing data from other files
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @class The User Class is used to implement a typical user of the application. (Username, password, name, email, etc.)
 */
class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    //Notice the syntax here. We are either accepting a string or a null
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();

    //Here is where we are referencing the Enums and Classes
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private location: Location | null = null;
}

export default User;