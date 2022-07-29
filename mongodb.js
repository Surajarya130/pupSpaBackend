const mongoose = require("mongoose");

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