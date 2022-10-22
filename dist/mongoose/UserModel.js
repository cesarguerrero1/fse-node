"use strict";
/**
 * Cesar Guerrero
 * 10/22/22
 * CS5500 - Fall 2022
 *
 * Assignment 2 - Given Model Code
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = __importDefault(require("./UserSchema"));
//NOTE: Models are how we interact with the database, but we need the schema to ensure we are interacting appropriately
const UserModel = mongoose_1.default.model('UserModel', UserSchema_1.default);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map