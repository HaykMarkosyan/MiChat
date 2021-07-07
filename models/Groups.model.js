const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema ({
    name: String,
    members: Array
})

const Groups = mongoose.model("Groups", groupSchema)

module.exports = Groups