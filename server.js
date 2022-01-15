const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PasteRoute = require('./Routes/PasteRoute')
const connectDB = require('./DB/Connection');

//connecting with DB
connectDB();

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})

app.use('/api',PasteRoute)