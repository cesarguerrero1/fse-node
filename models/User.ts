/**
 * Cesar Guerrero
 * 10/09/22
 * CS5500 - Fall 2022
 * 
 * Assignemnt 1 - Given Code
 */

//We are importing data from other files
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

//Users on Tuiter have basic information associated with them
class User {
    //Note the syntax! If a firstname is not provide, then just make it null
    private username: string = '';
    private password: string = '';
    private firstName: string = '';
    private lastName: string = '';
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private biography: string = '';
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();

    //Here is where we are referencing the Enums and Classes
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private location: Location | null = null;
}

export default User;