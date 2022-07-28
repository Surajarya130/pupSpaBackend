// Defining all the required package below
require('dotenv').config();
const express = require("express")
const EventEmitter = require("events")
const app = express();
const port = process.env.PORT || 3000;
let dogsRouter = require("./routes/dogs")
let waitinglist = require("./routes/waitingList")
let MongoClient = require("mongodb").MongoClient;
let cors = require("cors")
let dbConnect = require("./mongodb.js")



const emitter = new EventEmitter()
//0 to turn off the limit
emitter.setMaxListeners(100)

app.use(express.json())
app.use(cors())
// let url = "mongodb://localhost:27017";




// MongoClient.connect(url, async(err, db)=>{
//     if(err) throw err;
//     let dbs =  db.db("puppySpa")
//     let collect = await dbs.listCollections().toArray();
// })


// Home Page 
app.get("/", async(req, res)=>{
    dbConnect()
    res.send("Worked home page")

})



// Defining the routes of dogs
app.use('/dogs', dogsRouter)
app.use("/waitinglist", waitinglist)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})
