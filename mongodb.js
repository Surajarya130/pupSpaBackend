const mongoose = require("mongoose");
// let url = "mongodb://localhost:27017/puppySpa";
// let url = 'mongodb+srv://root:suraj123@cluster0.dyiou.mongodb.net/puppySpa'
// let url = 'mongodb+srv://root:suraj123@cluster0.dyiou.mongodb.net/puppySpa?retryWrites=true&w=majority';
// let MongoClient = require("mongodb").MongoClient;
// const client = new MongoClient(url);

// let dbName = 'puppySpa';

// async function dbConnect(collectionName) {
//     let result = await client.connect()
//     let db = result.db(dbName)
//     return db.collection(collectionName);
// }


// Mongoose method to connect mongoDb Connection
let dbConnect = async ()=>{   
    mongoose.connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }    
    )
    let db  = mongoose.connection;
    try {
        db.once("open", function() {
        console.log("Db connected")
        });
    } catch (error) {
        console.log(error)
    }
}





module.exports = dbConnect;