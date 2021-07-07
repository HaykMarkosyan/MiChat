const express = require("express")
const mongoose = require("mongoose")
const md5 = require("md5")
const nodemailer = require("nodemailer")
const registerController = require("../controller/register.controller")

// --- Models --- //
const Users = require("../models/Users.model")

const router = express.Router()

router.get("/", (req, res) => {
    if(req.session.loggedin) {
        res.redirect("/")
    } else {
     //React.js
        res.render("register", {e: null, u: null, p: null})   
    } 
})

router.post("/", registerController.userRegister)

router.get("/:username", (req, res) => {
    const username = req.params.username
    
    console.log(username + "\n" + req.session.registeruserinfo.username)
    
    if(username == req.session.registeruserinfo.username){
        res.render("remail", {username: req.session.registeruserinfo.username})
    } else {
        res.redirect("/register")
    }
})

router.post("/:username", registerController.emailSend)

router.get(`/verify/:username`, (req, res) => {
    const username = req.params.username
    
    if(username == req.session.registeruserinfo.username){
        res.render("rvcode", {username: req.session.registeruserinfo.username})
    }
})

router.post("/verify/:username", registerController.checkVcode)

module.exports = router