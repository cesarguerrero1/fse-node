"use strict";
/*
* Cesar Guerrero
* 10/23/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class The TuitDao Class defines several methods to interact with the database. We define these methods but the work
 * within each method is being done by built-in methods from the Mongoose Model Object (https://mongoosejs.com/docs/)
 * @implements {TuitDaoI}
 */
class TuitDao {
    //JSDOC for this functions is located in the interface
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all Tuit Objects
            return yield TuitModel_1.default.find();
        });
    }
    //JSDOC for this functions is located in the interface
    findTuitById(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find the Tuit Object with the given ID
            return yield TuitModel_1.default.findById(tuitid);
        });
    }
    //JSDOC for this functions is located in the interface
    findTuitsByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Search the database and find all Tuit Objects associated with the given user.
            //NOTE: When we find the user, we want to populate their information into the field
            //that normally just contains their ID
            return yield TuitModel_1.default.find({ postedBy: userid }, { _id: 0 }).populate('postedBy').exec();
        });
    }
    //JSDOC for this functions is located in the interface
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            //Insert a new Tuit Object into the database
            return yield TuitModel_1.default.create(tuit);
        });
    }
    //JSDOC for this functions is located in the interface
    deleteTuit(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete a Tuit object with the given ID from the database
            return yield TuitModel_1.default.deleteOne({ _id: tuitid });
        });
    }
    //JSDOC for this functions is located in the interface
    updateTuit(tuitid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            //Update a Tuit object with the given ID
            return yield TuitModel_1.default.updateOne({ _id: tuitid }, { $set: tuit });
        });
    }
}
exports.default = TuitDao;
//# sourceMappingURL=TuitDao.js.map