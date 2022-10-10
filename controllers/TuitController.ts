/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given UserController Code
 */

import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

class TuitController implements TuitControllerI{

    //Just like the UserController we need to access the app and DAO
    private app: Express;
    private tuitDao: TuitDao;

    constructor(app:Express, tuitDao: TuitDao){
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

    findAllTuits = (req:Request, res:Response) => {
        this.tuitDao.findAllTuits().then((tuits)=>res.json(tuits));
    }

    findTuitById = (req:Request, res:Response) => {
        this.tuitDao.findTuitById(req.params.tuitid).then((tuit) => res.json(tuit));
    }

    findTuitsByUser = (req:Request, res:Response) => {
        this.tuitDao.findTuitsByUser(req.params.userid).then((tuits) => res.json(tuits));
    }

    createTuit = (req:Request, res:Response) => {
        this.tuitDao.createTuit(req.body).then((tuit)=> res.json(tuit));
    } 

    deleteTuit = (req:Request, res:Response) => {
        this.tuitDao.deleteTuit(req.params.tuitid).then((status) => res.json(status));
    } 

    updateTuit = (req:Request, res:Response) => {
        this.tuitDao.updateTuit(req.params.tuitid, req.body).then((status) => res.json(status));
    }
}

export default TuitController;