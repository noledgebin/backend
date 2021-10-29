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
var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT
});

// Connecting to MySQL with the above credentials
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Accepting GET requests on this "" route
app.get("", (req, res) => {
    res.send("<p>Server is up and running</p>");
});