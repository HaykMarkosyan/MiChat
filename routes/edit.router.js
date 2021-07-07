const express = require("express")
const mongoose = require("mongoose")
const editController = require("../controller/edit.controller")

// --- Models --- //
const Users = require("../models/Users.model")

const router = express.Router()

router.get("/", (req, res) => {
    if(req.session.loggedin) {
        Users.findOne({username: req.session.username}, function(err, foundUser) {
            if(foundUser) {
                // React.js
            } else {
                //React.js
            }
        })
    } else {
        res.redirect("/")
    }
})

router.post("/", editController.editUser)

module.exports = router