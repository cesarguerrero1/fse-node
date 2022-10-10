/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Given TuitController Interface Code
 */

import { Request, Response } from "express";

interface TuitController {
    findAllTuits(req: Request, res: Response): void;
    findTuitById(req: Request, res: Response): void;
    findTuitsByUser(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
}

export default TuitController;
