const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
const express = require('express');
const mysql = require('mysql');
// Module to access form data
const bodyParser = require("body-parser");
const uuid = require('short-uuid');
const app = express();
const scheduler = new ToadScheduler()

// Required for environment variables (.env) which contain various credentials
require('dotenv').config();

const port = 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});

// Configuring body-parser for accessing form data
app.use(bodyParser.urlencoded({extended: true}));

// MySQL configuration
let con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT
});

// Connecting to MySQL with the above credentials
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    // Creating database if it doesn't exist
    const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS pastedb";
    con.query(createDatabaseQuery, function (err, result) {
        if (err)
            throw err;
        console.log("Database ready");
    });
    // Switching to the database to create table
    con.query("USE pastedb")
    // Creating the table if it doesn't exist
    const createTableQuery = "CREATE TABLE IF NOT EXISTS pastes (id VARCHAR(64) NOT NULL UNIQUE, paste LONGTEXT CHARACTER SET utf8 NOT NULL, deleteId VARCHAR(64) NOT NULL UNIQUE, expiry DATETIME);";
    con.query(createTableQuery, function (err, result) {
        if (err)
            throw err;
        console.log("Table ready");
    });
});


// Accepting GET requests on this "/api/v1/pasteId" route which will return object where the pasteId matches the route
app.get("/api/v1/:pasteId", (req, res) => {
    // Getting the paste from the database
    const SQLQuery = `SELECT id, paste FROM pastes WHERE id="${req.params.pasteId}"`;
    con.query(SQLQuery, function (err, result, fields) {
        if (err)
            throw err;
        if (result.length > 0)
            // Getting the first object as result is an array of objects
            result = result[0];
        else
            result = {};
        // Sending the encrypted paste to the frontend
        res.send(result);
    });
});

// Accepting POST requests on this "/api/v1/" route which will return object where the pasteId matches the route
app.post("/api/v1/", (req, res) => {
    // Generating a UUID
    const pasteId = uuid.generate();
    // Getting the paste from the request object
    const paste = req.body.paste;
    // Generating a UUID
    const deleteId = uuid.generate();
    // Getting current date
    const now = new Date();
    // Getting user expiry date time value in long
    let expiry = Number(req.body.expiry);
    let insertQuery;
    if (expiry !== 0) {
        // Calculating expiration time for paste (i.e. converting long to datetime)
        expiry = new Date(expiry)
        // Query to insert paste with ID as the above generated UUID
        insertQuery = `INSERT INTO pastes (id, paste, deleteId, expiry) VALUES (${con.escape(pasteId)}, ${con.escape(paste)}, ${con.escape(deleteId)},  ${con.escape(expiry)})`;
    } else {
        insertQuery = `INSERT INTO pastes (id, paste, deleteId) VALUES (${con.escape(pasteId)}, ${con.escape(paste)}, ${con.escape(deleteId)})`;
    }
    con.query(insertQuery, function (err, result) {
        if (err)
            throw err;
        console.log("1 record inserted");
        // Creating a JSON with the UUID (ID for the paste)
        const resJSON = {
            id: pasteId,
            deleteId: deleteId
        };
        // Sending this JSON to the browser
        res.send(resJSON);
    });
})
// Task to delete pastes that have expired
const task = new Task(
    // Id for the task
    'database delete task',
    () => {
        // Getting today's datetime
        const now = new Date();
        // Deleting all pastes which have expired
        const deleteQuery = `DELETE FROM pastes WHERE expiry <= ${con.escape(now)}`;
        // Executing the delete query
        con.query(deleteQuery, function (err, result) {
            if (err)
                throw err;
            // Logging if rows have been deleted
            if (result.affectedRows > 0)
                console.log(`Deleted ${result.affectedRows} rows`);
        });
    }
)
// Setting an interval for this deletion task
const job = new SimpleIntervalJob({seconds: 60,}, task)
// Starting this task
scheduler.addSimpleIntervalJob(job)
