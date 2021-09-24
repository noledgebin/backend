const express = require('express')
const app = express();

const port = 3000
app.listen(port, () => {
    console.log("Server running on port " + port);
})

app.get("", (req, res) => {
    res.send("<p>Server is up and running</p>")
})