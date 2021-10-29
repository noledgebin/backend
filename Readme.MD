## Installation

Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the required packages.

```bash
npm -i
```
MySQL is needed locally. For installation details view the [MySQL page](https://www.mysql.com/downloads/). After installation you may face [this issue](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) 

## Usage
Create a .env file in the root of the project it should contain the following
```
SQL_USERNAME=username
SQL_PASSWORD=password
SQL_HOST=host
SQL_PORT=port
```
Run server using
```bash
node index.js
```
To change port
```javascript
const express = require('express')
const app = express();

// Port
const port = 3000
app.listen(port, () => {
    console.log("Server running on port " + port);
})

app.get("", (req, res) => {
    res.send("<p>Server is up and running</p>")
})
```