const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PasteRoute = require('./Routes/PasteRoute')

//connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/PasteDB',{useNewUrlParser: true , useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
} )
db.once('open',()=>{
    console.log('Connected to the Database')
})
//--------------------------------


const app = express()
// using Morgan Middle to create log of requests
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//--------------------------------

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})

app.use('/api',PasteRoute)
