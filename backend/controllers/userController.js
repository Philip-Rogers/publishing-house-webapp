// npm install express
const express = require("express")
// npm install bcrypt
const bcrypt = require("bcrypt")
// npm install validator
const validator = require("validator")


const router = express.Router()
const userModel = require("../models/userModel")


// Define a /api/user endpoint that responds with an array of all user.
router.get("/users", (req, res) => {
    userModel.getAllUsers()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})


// api endpoint to get user by id
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get user - query error")
        })
})




// api endpoint to create user
router.post("/users/create", (req, res) => {
    // cheack if user is admin
    if (req.session.user.accessRights != "admin") {
        // Send error message if not admin
        res.status(403).json("Only admin can perform this action")
        // stop the response 
        return;
    }
    // the req.body represents the posted json data
    let user = req.body

    // Hash the password before inserting into the DB
    let hashedPassword = bcrypt.hashSync(user.password, 6)
    // Each of the following names reference the "name"
    // attribute in the inputs of the form.
    userModel.createUser(
            validator.escape(user.username),
            hashedPassword, //store the hashed password
            validator.escape(user.accessRights)
        )
        .then((results) => {
            res.status(200).json("user created with id" + results.insertId)
        })
        .catch((error) => {
            res.status(500).json("query error - failed to create user")
            console.log(error)
        })
})




// Grab users by ID
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("Failed to get user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("Failed to get user - query error")
        })
})




// Define an /api/users/update endpoint that updates an existing users
router.post("/users/update", (req, res) => {
    // cheack if user is admin
    if (req.session.user.accessRights != "admin") {
        // Send error message if not admin
        res.status(403).json("Only admin can perform this action")
        //stop the response 
        return;
    }
    // the req.body represents the posted json data
    let user = req.body

    // If the password does not start with a $ then we need to hash it
    let hashedPassword = user.password
    if (!user.password.startsWith("$2b$")) {
        hashedPassword = bcrypt.hashSync(user.password, 6)
    }

    // Each of the names below reference the "name" attribute in the form
    // defined in this file
    userModel.updateUser(
        validator.escape(user.userID),
        validator.escape(user.username),
        hashedPassword, //used hashed password
        validator.escape(user.accessRights)
        )
        .then((results) => {
            if (results.affectedRows > 0) {
                res.status(200).json("User updated")
            } else {
                res.status(400).json("User not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("Failed to update user - query error")
        })
})




// Check admin permissions
router.delete("/users/delete/:id", (req, res) => {
    // admin only check
    if (req.session.user.accessRights != "admin") {
        res.status(403).json("Only admin can perform this action")
        //stop the response handler
        return;
    }
    // If admin permissions clear proceed to next step
    // Ask the model to delete the user with userId
    userModel.deleteUser(
        // sanitize input
        validator.escape(req.params.id)
    )
        .then((results) => {
            if (results.affectedRows > 0) {
                res.status(200).json("User deleted")
            } else {
                res.status(404).json("User not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("Failed to delete user - query error")
        })
})




router.post("/users/login", (req, res) => {
    // Get the login information
    let login = req.body
    console.log(login)
    // Find a user with a matching username
    userModel.getUserByUsername(
        validator.escape(login.username)
        )
        .then((results) => {
            // Results returns an array, if its length is greater than 0, we found a user
            if (results.length > 0) {
                // Get the found user
                let user = results[0] //grab the first one, users are unique

    // We need to check if the found users password matches the login password
    if (bcrypt.compareSync(login.password, user.password)) { //compares log password with fingerprint of stored password to see if it matches
        //user is now authenticated

    // We need to setup the session for that now logged in user
    req.session.user = {
        userID: user.userID,
        username: user.username,
        accessRights: user.accessRights
    }
    // let the client know that login was successful
    res.status(200).json("login successful")
} else {
    // If the password was incorrect
    res.status(401).json("login failed")

}
} else {
// If the username doesn't exist
res.status(401).json("login failed")
}
})
.catch((error) => {
    console.log(error)
    res.status(500).json("failed to login - query error")
})
})


// logout controller 
router.post("/users/logout", (req, res) => {
    // destroy the session 
    req.session.destroy()
     res.status(200).json("logged out")
 })




// This allows the server.js to import (require) the routes
// defined in this file.
module.exports = router