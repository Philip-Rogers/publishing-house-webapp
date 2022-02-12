//access the database connection from database.js
const db = require("../database")

// retrieve all books from database
// join tables for changelog 
module.exports.getAllBooks = () => {
    // return db.query("SELECT * FROM book");
    return db.query(
        `
        SELECT * FROM changelog
        RIGHT JOIN users
        ON changelog.userID = users.userID
        RIGHT JOIN book
        ON changelog.bookID = book.bookID
        RIGHT JOIN author
        ON book.authorID = author.authorID
        ORDER BY book.bookID ASC
        `)
}

// Create new book query
module.exports.createNewBook = (coverImagePath, bookTitle, yearofPublication, authorID, millionsSold) => {
    return db.query("INSERT INTO book ( coverImagePath, bookTitle, yearofPublication, authorID, millionsSold)" +
    "VALUES ( ?, ?, ?, ?, ?)", [coverImagePath, bookTitle, yearofPublication, authorID, millionsSold])
}

//  Get books by their ID query
module.exports.getBookById = (bookID) => {
    return db.query("SELECT * FROM book WHERE bookID = ?", [bookID]);
}

// Update books query
module.exports.updateBook = (bookID, coverImagePath, bookTitle, yearofPublication, authorID, millionsSold) => {
    return db.query("UPDATE book SET coverImagePath = ?, bookTitle = ?, yearofPublication = ?, authorID = ?, millionsSold = ? WHERE bookID = ?",
        [coverImagePath, bookTitle, yearofPublication, authorID, millionsSold, bookID])
}

// Delete books query
module.exports.deleteBook = (bookID) => {
    return db.query("DELETE FROM book WHERE bookID = ?", [bookID])
}