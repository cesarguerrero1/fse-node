/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given UserController Interface Code
 */

import { Request, Response } from "express"; //We need express in order to make HTTP Requests

interface UserController {
    //We will use these functions to respond to specific HTTP Requests
    findAllUsers(req: Request, res: Response): void;
    findUserById(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
}

export default UserController;