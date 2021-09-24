## Installation

Use the [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the required packages.

```bash
npm -i
```

## Usage
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