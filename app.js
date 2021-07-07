require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const mongoose = require("mongoose")
const multer = require("multer")

// --- Routes --- //
const loginRoute = require("./routes/login.router")
const registerRoute = require("./routes/register.router")
const chatRoute = require("./routes/chat.router")
const userRoute = require("./routes/user.router")
const editRoute = require("./routes/edit.router")

const app = express()

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
    bodyParser.urlencoded({
    extended: false,
  })
);

app.use(session({
    secret: "MiChat should become the best chat app forever.",
    resave: false,
    saveUninitialized: true
}))

mongoose.connect(process.env.mongooseURI, function() {
    console.log("mongoose connected )).")
})

app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/chat", chatRoute)
app.use("/users", userRoute)
app.use("/edit", editRoute)

app.get("/", (req, res) => {
    if(req.session.loggedin){
        res.render("/login")
    } else {
        res.redirect("/home")
    }
})

app.get("/home", (req, res) => {
    res.render("home", {
        loggedin: req.session.loggedin,
        username: req.session.username
    })
})

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log(`App running on port ${port}.`)
})