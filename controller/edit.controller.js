const Users = require("../models/Users.model")

const editUser = (req, res) => {
    if(req.session.loggedin) {
        const edituserinfo = {
            username: req.body.username,
            bio: req.body.bio
        }
        Users.findOne({username: edituserinfo.username}, function(err, foundUser) {
            if(foundUser && req.session.username != foundUser.username) {
                res.redirect("/")
            } else {
                Users.findOneAndUpdate({username: req.session.username}, {username: edituserinfo.username, bio: edituserinfo.bio})
            }
        })
    }
}

module.exports = {
    editUser
}