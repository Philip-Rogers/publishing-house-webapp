//* SERVER

// npm install express
const express = require('express')

// npm install express-session
const session = require('express-session')

const server = express()
const port = 8080


//Enable middleware for JSON and url-encoded form data
server.use(express.json())
server.use(express.urlencoded({
    extended: true
}))


// Enable session middleware so that we have state
server.use(session({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))


//Setup our own access control middleware
//Must happen after JSON and session middleware but before static files
server.use((req, res, next) => {
    // The user is logged in if they have session data
    let userLoggedIn = req.session.user != null
    console.log(req.originalUrl)
    // URLs we will allow for non logged in clients (guests)
    let guestAllowedURLs = [
        "/html/login.html",
        "/javascript/login.js",
        "/css/style.css",
        "/api/users/login",
        "/html/header.html",
        "/javascript/header.js",
        "/html/footer.html",
        "/javascript/footer.js"
    ]

    if (userLoggedIn) {
        // Allow the request through
        next()
    } else {
        // Check that the guest page is only
        // asking for an allowed resource
        if (guestAllowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next()
        } else {
            // Redirect them to the login page
            res.redirect("/html/login.html")
        }
    }
})


//Serve static frontend resources after middleware
server.use(express.static("frontend"))


//Link up book controller
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

// Link up the user controller
const userController = require("./backend/controllers/userController")
server.use("/api", userController)

// Link up the author controller
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

// Link up the covers controller
const coversController = require("./backend/controllers/coversController")
server.use("/api", coversController)


// start the express server
server.listen(port, () => {
    console.log("Server listening on http://localhost:" + port)
})