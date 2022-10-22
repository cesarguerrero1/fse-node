"use strict";
/**
 * Cesar Guerrero
 * 10/22/22
 * CS5500 - Fall 2022
 *
 * Assignment 2 - Tuit Model
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema_1 = __importDefault(require("./TuitSchema"));
const TuitModel = mongoose_1.default.model('TuitModel', TuitSchema_1.default);
exports.default = TuitModel;
//# sourceMappingURL=TuitModel.js.map