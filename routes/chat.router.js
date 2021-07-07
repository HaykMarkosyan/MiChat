const express = require("express")
const mongoose = require("mongoose")
const validator = require("email-validator")
// const crypto = require("crypto")

// crypto //
// const secret = "enjoy chatting!"


// --- Models --- //
const Users = require("../models/Users.model")
const Chats = require("../models/Chats.model")
const Groups = require("../models/Groups.model")

const router = express.Router()

router.get("/", (req, res) => {
    if(req.session.loggedin) {
        //React.js
    } else {
        res.redirect("/")
    }
})

router.get("/:GandCid", (req, res) => {


})

router.get("/group", (req, res) => {
    if(req.session.loggedin) {
        //React.js
    }
})

router.post("/group", (req, res) => {
    if(req.session.loggedin) {
        const groupinfo = {
            groupname: req.body.groupname,
            members: req.body.members
        }
        const usersid = []

        groupinfo.members.map(member => {
            Users.findOne({email: member}, function(err, IDUser) {
                if(IDUser) {
                    usersid.push(IDUser._id)
                }
            })
        })

        Groups.insertOne({name: groupinfo.groupname, members: usersid}, function(err, insertedItem) {
            if(insertedItem) {
                fs.writeFile(`../models/groups/${insertedItem._id}`, `const mongoose = require("mongoose"); cosnt ${insertedItem._id}Schema = new mongoose.Schema({name: String, message: String}); const IDGroup = mongoose.model("${insertedItem._id}", ${insertedItem._id}Schema)`, function(err) {
                    if(err) {return res.send("Something went wrong"); console.log(err)}
                    Users.updateOne({username: req.session.username}, { $push: { GandC: groupinfo._id}})
                })
            }
        })  
    }
})

router.post("/search/:nameORemail", async (req, res) => {
    const requestedUser = req.params.nameORemail

    if(validator.validate(requestedUser)) {
        await Users.findOne({email: requestedUser}, function(err, fUser) {
            if(fUser) {
                //return //React.js
            }
        })
    } else {
        await Users.find({username: requestedUser}, function(err, fUsers) {
            if(fUsers) {
                //return //React.js
            }
        })
    }
    res.send("No User found...")
})

module.exports = router 