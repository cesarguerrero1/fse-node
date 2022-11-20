"use strict";
/*
* Cesar Guerrero
* 10/25/22
* CS5500 - Fall 2022
*
* Assignment 2
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class The MessageController Class maps HTTP endpoints to methods that we have defined. Within those methods we will be
 * calling on the DAO and once the DAO returns the data we need. We will 'consume' the Promise and interact with the data
 * in order to present it to the client appropriately.
 * @implements {MessageControllerI}
 */
class MessageController {
    /**
     * This class will be instaniated within our server file and we will need
     * to connect an instance of both our application and the DAO in question
     * @param app The instance of our Express Application
     * @param messageDao The DAO that will allow us to interact with the database
     */
    constructor(app, messageDao) {
        /**
         * This function will be delegating the task of creating a new Messag Object
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing two unique User IDs and a Message JSON in the body
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the newly created Message record
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userSendsMessageToUser = (req, res) => {
            this.messageDao.userSendsMessageToUser(req.params.uid, req.params.otherUid, req.body).then((messages) => res.json(messages));
        };
        /**
         * This function will be delegating the task of finding all Messages a given User has sent
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Messages where the User is the one who sent the Message
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findUsersMessagesSent = (req, res) => {
            this.messageDao.findUsersMessagesSent(req.params.uid).then((messages) => res.json(messages));
        };
        /**
         * This function will be delegating the task of finding all Messages a given User has received
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the User ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Messages where the User is hte one who received a Message
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findUsersMessagesReceived = (req, res) => {
            this.messageDao.findUsersMessagesReceived(req.params.uid).then((messages) => res.json(messages));
        };
        /**
         * This function will be delegating the task of deleting a Message record from within the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the Message ID
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON containing a status update for the deletion
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userDeleteMessage = (req, res) => {
            this.messageDao.userDeleteMessage(req.params.mid).then((messages) => res.json(messages));
        };
        /**
         * This function will be delegating the task of updating a Message record
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object with a parameter containing the Message ID and a Message JSON to update the Message
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of the update status
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.userEditsMessage = (req, res) => {
            this.messageDao.userEditsMessage(req.params.mid, req.body).then((messages) => res.json(messages));
        };
        /**
         * This function will be delegating the task of finding all Messages in the database
         * to the DAO and once the DAO returns the appropriate data the controller will do the rest
         * @param {RequestObject} req Request Object
         * @param {ResponseObject} res Reponse Object from query which in this case contains a JSON of all Message Objects from the database
         * @return {void} Since the controller is interacting directly with our client, we don't need to return anything
         * as we will likely just programatically display the content on the screen
         */
        this.findAllMessages = (req, res) => {
            this.messageDao.findAllMessages().then((messages) => res.json(messages));
        };
        this.app = app;
        this.messageDao = messageDao;
        //HTTP Listeners
        this.app.post("/users/:uid/messages/:otherUid", this.userSendsMessageToUser);
        this.app.get("/users/:uid/messages/sent", this.findUsersMessagesSent);
        this.app.get("/users/:uid/messages/received", this.findUsersMessagesReceived);
        this.app.delete("/messages/:mid", this.userDeleteMessage);
        this.app.put("/messages/:mid", this.userEditsMessage);
        this.app.get("/messages", this.findAllMessages);
    }
}
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map