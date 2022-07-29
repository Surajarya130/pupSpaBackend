// Defining all the required package below
require('dotenv').config();
const express = require("express")
const EventEmitter = require("events")
const app = express();
const port = process.env.PORT || 3000;
let dogsRouter = require("./routes/dogs")
let cors = require("cors")
let dbConnect = require("./mongodb.js");
const natDbCon = require('./monoDbNative');
const emitter = new EventEmitter()
emitter.setMaxListeners(100)
app.use(express.json())
app.use(cors())


// Home Page 
app.get("/", async(req, res)=>{
    dbConnect()
    res.send("Worked home page")
})

// Defining the route of pups page
app.use('/dogs', dogsRouter)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
