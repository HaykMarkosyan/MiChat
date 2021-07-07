const express = require("express")
const mongoose = require("mongoose")

// --- Models --- //
const Users = require("../models/Users.model")

const router = express.Router()

router.get("/:username", (req, res) => {
    const requestedUsername = req.params.username

    Users.findOne({username: requestedUsername}, function(err, foundUser) {
        if(foundUser) {
            if(requestedUsername == req.session.username) {
                //React.js
            } else {
                //React.js
            }
        } else {
            res.redirect("/")
        }
    })
})

module.exports = router