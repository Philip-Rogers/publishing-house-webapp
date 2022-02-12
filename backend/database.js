// Import mysql2 module so that we can talk to the database server
const mysql = require("mysql2")

// Create connection to the database server
const connection = mysql.createPool({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "booksPublish"
})

// This wrapper will allow the use of promise functions
// like .then() and .catch() so that we can use it in an async
// way along with expressJS.
const query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

// Export the new query function so that the models can use it
module.exports = {
    query
}