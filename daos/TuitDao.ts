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
    async findAllTuits(): Promise<Tuit[]>{
        return await TuitModel.find();
    }

    async findTuitById(tuitid: string): Promise<any>{
        return await TuitModel.findById(tuitid);
    }

    async findTuitsByUser(userid: string): Promise<Tuit[]>{
        return await TuitModel.find({postedBy: userid}, {_id:0}).populate('postedBy').exec();
    }

    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }

    async deleteTuit(tuitid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tuitid});
    }

    async updateTuit(tuitid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.updateOne({_id: tuitid}, { $set: tuit});
    }
    
}

export default TuitDao;
