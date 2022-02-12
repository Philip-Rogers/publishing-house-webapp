// Access the database connection from database.js
const db = require("../database")

// Retrieve all authors database query
module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author")
}