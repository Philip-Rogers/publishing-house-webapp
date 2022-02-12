// npm install express
const express = require("express")
// create router to enable API defining
const router = express.Router()
// Connect to bookModel.js so we can talk to the DB
const authorModel = require("../models/authorModel")

//api endpoint to get all authors
router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})


// This allows the server.js to import (require) the routes
// defined in this file.
module.exports = router