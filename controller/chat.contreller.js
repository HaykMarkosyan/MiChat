const Users = require("../models/Users.model")
const Chats = require("../models/Chats.model")
const Groups = require("../models/Groups.model")

const findChat = (req, res) => {
    if(req.session.loggedin) {
        const requestedGandC = req.params.GandC

        Chats.findOne({id: requestedGandC}, function(err, foundChat) {
            if(foundChats) {
                const idChat = require(`../models/${requestedGandC}.model`)

                idChat.find({}, function(err, foundMessages) {
                    if(foundMessages) {
                        var key = crypto.createDecipher('aes-128-cbc', Users.find({username: req.session.username}, function(err, foundUserPassword) {return foundUserPassword.password}));
                        foundMessages = map.foundMessages(message => {
                            var strcmessage = key.update(message, 'hex', 'utf8')
                            strcmessage += key.final('utf8');
                            message = strcmessage
                        })
                        //render foundMessages[i] .messages/.name IN EJS
                        //React.js
                    }
                }).limit(150)
                return //React.js
            } else {
                Groups.findOne({id: requestedGandC}, function(err, foundGroups) {
                    if(foundGroups) {
                        const idGroup = require(`../models/${requestedGandC}.model`)

                        idGroup.find({}, function(err, foundMessages) {
                            if(foundMessages) {
                                //render foundMessages[i] .messages/.name IN EJS
                                //React.js
                            }
                        }).limit(750)
                        return //React.js
                    } else {
                        res.send("No Chats or Groups found ((") //Start Chat
                    }
                })
            }
        })
    }
}