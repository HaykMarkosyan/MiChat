const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    email: {type: String, required: true},
    username: {type: String, required: true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    imgname: {type: String, required: true},
    passowrd: {type: String, required: true},
    bio: {type: String, required: true},
    GandC: {type: Array}
})

const Users = mongoose.model("Users", userSchema)

module.exports = Users