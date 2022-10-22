"use strict";
/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 *
 * Assignment 1 - Given UserController Code
 */
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    //When we build the Controller we need our Constructor
    constructor(app, userDao) {
        //We are storing this function under the name findAllUsers
        this.findAllUsers = (req, res) => {
            //NOTE: When this function is called it means we are getting an HTTP Request
            //and we need to look within the request to see how to respond
            return this.userDao.findAllUsers().then((users) => res.json(users));
        };
        //Non-Verbose way to write it 
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.userid).then(user => res.json(user));
        this.createUser = (req, res) => {
            return this.userDao.createUser(req.body).then(user => res.json(user));
        };
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.userid).then(status => res.json(status));
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.userid, req.body).then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        //We are listening for these Type of HTTP Requests at these paths and when we get the given request, call the specified function 
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map