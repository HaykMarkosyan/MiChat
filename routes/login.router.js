const express = require("express")
const mongoose = require("mongoose")
const loginController = require("../controller/login.controller")

// --- Models --- //
const Users = require("../models/Users.model")

const router = express.Router()


router.get("/", (req, res) => {
    if(req.session.loggedin) {
        res.redirect("/")
    } else {
        //React.js
        res.render("login", {eoru: false})
    }
})

router.post("/", loginController.userLogin)

module.exports = router