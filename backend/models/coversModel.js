// Access the database connection from database.js
const db = require("../database")

//  Get all cover images query
module.exports.getAllCovers = () => {
    return db.query("SELECT * FROM image")
}

// Adds a new image url path into the database
module.exports.addCoverImage = ( coverImagePath) => {
    return db.query("Insert into image (coverImagePath + Values(?)", 
    [coverImagePath] )
}