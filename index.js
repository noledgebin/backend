const express = require('express');
const mysql = require('mysql');
const app = express();

// Required for environment variables (.env) which contain various credentials
require('dotenv').config()

const port = 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});

// MySQL configuration
let con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT
});

// Connecting to MySQL with the above credentials
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // Creating database if it doesn't exist
    const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS pastedb";
    con.query(createDatabaseQuery, function (err, result) {
        if (err) throw err;
        console.log("Database ready");
    });
    // Switching to the database to create table
    con.query("USE pastedb")
    // Creating the table if it doesn't exist
    const createTableQuery = "CREATE TABLE IF NOT EXISTS pastes (id VARCHAR(64), paste LONGTEXT CHARACTER SET utf8);";
    con.query(createTableQuery, function (err, result) {
        if (err) throw err;
        console.log("Table ready");
    });
});


// Accepting GET requests on this "/pasteId" route which will return object where the pasteId matches the route
app.get("/:pasteId", (req, res) => {
    // Getting the paste from the database
    const SQLQuery = "SELECT * FROM pastes WHERE id=" + req.params.pasteId;
    con.query(SQLQuery, function (err, result, fields) {
        if (err)
            throw err;
        // Sending the encrypted paste to the frontend
        res.send(result);
    });
});