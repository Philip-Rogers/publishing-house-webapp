const express = require("express");
// enable validation module to sanitize
const validator = require("validator")
// create router to enable API defining
const router = express.Router()
// Connect to bookModel.js so we can talk to the DB
const bookModel = require("../models/bookModel")
// Connect to logModel.js so we can talk to the DB
const logModel = require("../models/logModel")


// create endpoint that returns all books
router.get("/books", (req, res) => {
    bookModel.getAllBooks()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // log the errors tot he node console
            console.log(error)
            res.status(500).json("query error")
        })
})


// create endpoint that returns data of single book 
router.get("/books/:id", (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to get book by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get book - query error")
        })
})


// create endpoint that creates a book
router.post("/books/create", (req, res) => {

    // req.body is form data (that was converted to json and put in body of fetch)
    let book = req.body
    console.log(book)
    // book is the req bod, following that is the json key from the form
    bookModel.createNewBook(
            validator.escape(book.coverImagePath),
            validator.escape(book.bookTitle),
            validator.escape(book.yearofPublication),   
            validator.escape(book.authorID),
            validator.escape(book.millionsSold)
        )
        .then((result) => {
            res.status(200).json("book created!")
            let dateTimeNow = (new Date())
            logModel.addLogEntryBook(result.insertId, req.session.user.userID, dateTimeNow)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error - failed to create book")
        })
})


// endpoint to update book
router.post("/books/update", (req, res) => {
    let book = req.body
    // store session data
    let user = req.session.user

    bookModel.updateBook(
        validator.escape(book.bookID),
        validator.escape(book.coverImagePath),
        validator.escape(book.bookTitle),
        validator.escape(book.yearofPublication),
        validator.escape(book.authorID),
        validator.escape(book.millionsSold)
    )
    
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book updated")
                let dateTimeNow = (new Date())
                logModel.updateLogEntryBook(book.bookID, req.session.user.userID, dateTimeNow)
            } else {
                res.status(404).json("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to get book – query error")
        })
})


// delete endpoint
router.delete("/books/delete/:id", (req, res) => {
    // get the Model to tell DB to delete the book with bookID
    bookModel.deleteBook(
        // sanitize input
        validator.escape(req.params.id)
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted")
                console.log("book deleted")
            } else {
                res.status(404).json("book not found")
                console.log("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete book – query error")
            console.log("query error")
        })
})


// import(require) the routes from this file into sever.js
module.exports = router