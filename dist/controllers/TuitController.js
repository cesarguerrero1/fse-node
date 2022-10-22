"use strict";
/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 *
 * Assignment 1 - Given UserController Code
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TuitController {
    constructor(app, tuitDao) {
        this.findAllTuits = (req, res) => {
            this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
        };
        this.findTuitById = (req, res) => {
            this.tuitDao.findTuitById(req.params.tuitid).then((tuit) => res.json(tuit));
        };
        this.findTuitsByUser = (req, res) => {
            this.tuitDao.findTuitsByUser(req.params.userid).then((tuits) => res.json(tuits));
        };
        this.createTuit = (req, res) => {
            this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
        };
        this.deleteTuit = (req, res) => {
            this.tuitDao.deleteTuit(req.params.tuitid).then((status) => res.json(status));
        };
        this.updateTuit = (req, res) => {
            this.tuitDao.updateTuit(req.params.tuitid, req.body).then((status) => res.json(status));
        };
        this.app = app;
        this.tuitDao = tuitDao;
        //HTTP Listeners
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tuitid', this.findTuitById);
        this.app.get('/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.delete('/tuits/:tuitid', this.deleteTuit);
        this.app.put('/tuits/:tuitid', this.updateTuit);
    }
}
exports.default = TuitController;
//# sourceMappingURL=TuitController.js.map