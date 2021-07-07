const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema ({
    name: String,
    members: Array
})

const Chats = mongoose.model("Chats", chatSchema)

module.exports = Chats