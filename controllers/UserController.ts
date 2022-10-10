/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given UserController Code
 */

import { Request, Response, Express } from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

class UserController implements UserControllerI {
    //We are expecting an app of TYPE EXPRESS
    private app: Express;
    //We are expecting a DAO of TYPE UserDAO
    private userDao: UserDao;
    
    //When we build the Controller we need our Constructor
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        //We are listening for these Type of HTTP Requests at these paths and when we get the given request, call the specified function 
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }

    //We are storing this function under the name findAllUsers
    findAllUsers = (req: Request, res: Response) => {
        //NOTE: When this function is called it means we are getting an HTTP Request
        //and we need to look within the request to see how to respond
        return this.userDao.findAllUsers().then((users) => res.json(users));
    }
    //Non-Verbose way to write it 
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid).then(user => res.json(user));
    
    createUser = (req: Request, res: Response) =>{
        return this.userDao.createUser(req.body).then(user => res.json(user));
    }

    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid).then(status => res.json(status));
    
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body).then(status => res.json(status));
}

export default UserController;
