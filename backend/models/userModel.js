// Access the database connection from database.js
const db = require("../database")

// Get all users database query
module.exports.getAllUsers = () => {
    return db.query("SELECT userID, username, accessRights FROM users");
}

// Add user to database
module.exports.createUser = (username, password, accessRights) => {
    return db.query("INSERT INTO users ( username, password, accessRights)" +
        "VALUES ( ?, ?, ?)", [username, password, accessRights])
}

// Get user ID from database query
module.exports.getUserById = (userId) => {
    return db.query("SELECT * FROM users WHERE userID = ?", [userId])
}

// Get user by their username
module.exports.getUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = ?", [username])
}

// Update user info
module.exports.updateUser = (userId, username, password, accessRights) => {
    return db.query("UPDATE users SET username = ?, password = ?, accessRights = ? WHERE userID = ?", [username, password, accessRights, userId])
}

// Delete user from database
module.exports.deleteUser = (userId) => {
    return db.query("Delete FROM users WHERE userID = ?", [userId])
}