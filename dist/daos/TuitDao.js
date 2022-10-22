"use strict";
/**
 * Cesar Guerrero
 * 10/9/22
 * CS5500 - Fall 2022
 *
 * Assignment 1 - Tuit Data Access Objet Code
 * NOTE: A lot of this code is made with the help of Prof. Annunziato's code from class
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
class TuitDao {
    //Recall that the DAO is what allows our controller to talk to the Model
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find();
        });
    }
    findTuitById(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.findById(tuitid);
        });
    }
    findTuitsByUser(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.find({ postedBy: userid }, { _id: 0 }).populate('postedBy').exec();
        });
    }
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.create(tuit);
        });
    }
    deleteTuit(tuitid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tuitid });
        });
    }
    updateTuit(tuitid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.updateOne({ _id: tuitid }, { set: tuit });
        });
    }
}
exports.default = TuitDao;
//# sourceMappingURL=TuitDao.js.map