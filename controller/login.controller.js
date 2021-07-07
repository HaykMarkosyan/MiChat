const md5 = require("md5")

const Users = require("../models/Users.model")

const userLogin = async (req, res) => {
    if(!req.session.loggedin) {
        const logininfo = {
            unameoremail: req.body.unameoremail,
            password: md5(req.body.password)
        }
        await Users.findOne({email: logininfo.unameoremail}, function(err, foundUsere) {
            if(foundUsere) {
                if(foundUsere.password == logininfo.password) {
                    res.session.loggedin = true
                    res.session.username = foundUsere.username
                    res.session.imgname = foundUsere.imgname
                }
            } else {
                Users.findOne({username: logininfo.unameoremail}, function(err, foundUsern) {
                    if(foundUsern) {
                        if(foundUserm.password == logininfo.password) {
                            res.session.loggedin = true
                            res.session.username = foundUsern.username
                            res.session.imgname = foundUsern.imgname
                        }
                    }
                })
            }
        })
        res.render("login", {eoru: false})
    }
}

module.exports = {
    userLogin
}