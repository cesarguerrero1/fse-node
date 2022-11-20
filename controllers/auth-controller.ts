/*
* Cesar Guerrero
* 11/19/22
* CS5500 - Fall 2022
* 
* Assignment 4
*/

import {Express, Request, Response} from "express";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

function AuthenticationController(app: Express, userDao: UserDao){

    //Our HTTP Requests
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/login", login);

    //Signup Controller
    async function signup(req: Request, res: Response){
        const newUser = req.body;

        const existingUser = await userDao.findUserByUsername(newUser.username);

        //If the user already exists then say request denied (ERROR: 403)
        if(existingUser){
            return res.sendStatus(403);
        }else{
            //We don't want to save the actual password in the database!!!
            const password = newUser.password;
            const hash = await bcrypt.hash(password, saltRounds);
            newUser.password = hash;
            //Make our new user
            const insertedUser = await userDao.createUser(newUser);
            insertedUser['password'] = ''; //Set their password to an empty string locally (The database will be getting the hash)
            req.session['profile'] = insertedUser; //Place our new user into the 'profile' property of Session
            return res.json(insertedUser)
        }
    }

    //Allow the user to see their profile
    function profile(req: Request, res: Response){
        let profile: any; 
        profile = req.session['profile'];
        console.log("Looking in the profile now!");
        console.log(req.session);
        console.log(req.sessionID);

        //If a session exists then then return the profile so we can display it onscreen!
        if(profile){
            profile['password']= "";
            return res.json(profile);
        }else{
            return res.sendStatus(403);
        }
    }

    //Log the user out
    function logout(req: Request, res: Response){
        req.session.destroy(() => {});
        //Successfull destruction of session
        return res.sendStatus(200); 
    }

    //Log the user in
    async function login(req: Request, res: Response){
        console.log("We are getting here!");
        console.log(req.session);
        console.log(req.sessionID);
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao.findUserByUsername(username);

        if(!existingUser){
            console.log("user doesn't exist!??!");
            return res.sendStatus(403);
        }
        
        const match = await bcrypt.compare(password, existingUser.password);
        if(match){
            existingUser.password = "*****";
            req.session['profile'] = existingUser;
            console.log("We have a match!");
            console.log(req.session);
            console.log(req.sessionID);
            return res.json(existingUser);
        }else{
            console.log("... Why are we here?");
            return res.sendStatus(403);
        }
    }

}

export default AuthenticationController;