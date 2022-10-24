/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
* 
* Assignment 2
*/

/**
 * @file This file stores an enum representing the type of account a user can have (Personal, Academic, Professional)
 * If you wanted to start implementing things like administrators, you would add more options to this enum
 */

/**
 * @enum A user's account type will fall into one of the choices below
 */
enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
};

export default AccountType;
