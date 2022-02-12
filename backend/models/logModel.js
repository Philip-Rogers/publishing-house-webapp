// Access the database connection from database.js
const db = require("../database")

// Add user log entry query
module.exports.addLogEntryBook = (bookID, userID, dateCreated) => {
    return db.query("INSERT INTO changelog (bookID, userID, dateCreated) " + "VALUES (?, ?, ?)", [bookID, userID, dateCreated])
}

// Update user log entry
module.exports.updateLogEntryBook = (bookID, userID, dateChanged) => {
    return db.query("UPDATE changelog SET userID=?, dateChanged=? WHERE bookID=?", [userID, dateChanged, bookID])
}