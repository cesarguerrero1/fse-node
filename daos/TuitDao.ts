/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 * 
 * Assignment 1 - Tuit Data Access Objet Code
 * NOTE: A lot of this code is made with the help of Prof. Annunziato's code from class
 */
/*
import Tuit from "../models/Tuit"
import TuitModel from "../mongoose/TuitModel"
import TuitDaoI from "../interfaces/TuitDao"
import UserModel from "../mongoose/UserModel";

class TuitDAO implements TuitDaoI{


    async findAllTuits(): Promise<Tuit[]>{
        return await TuitModel.find();
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]>{
        //In order to find tuits by a given user we need to loop over
        //all of the tuits and see which ones are pointing to our User Object
        (await TuitModel.find()).map(
            (tuit) =>{
                tuit.User.
            }
        )
    }

    async findTuitById(tid: string): Promise<Tuit>{
        return await TuitModel.findById(uid);
    }

    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(user);
    }

    async deleteTuit(tid: string): Promise<any>{
        return await TuitModel.deleteOne({ _id: uid });
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.updateOne({ _id: uid }, { $set: user });
    }
}
*/
