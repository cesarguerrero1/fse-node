/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Tuit Data Access Objet Code
 * NOTE: A lot of this code is made with the help of Prof. Annunziato's code from class
 */

import Tuit from "../models/Tuit"
import TuitModel from "../mongoose/TuitModel"
import TuitDaoI from "../interfaces/TuitDao"

class TuitDao implements TuitDaoI{

    //Recall that the DAO is what allows our controller to talk to the Model
    async findAllTuits(req: Request, res: Response): Promise<Tuit[]>{
        return await 
    }
    findTuitById(req: Request, res: Response): void;
    findTuitsByUser(req: Request, res: Response): void;
    createTuit(req: Request, res: Response): void;
    updateTuit(req: Request, res: Response): void;
    deleteTuit(req: Request, res: Response): void;
}
