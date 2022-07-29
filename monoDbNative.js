const {MongoClient} = require("mongodb");
// const url = "mongodb+srv://root:suraj123@cluster0.dyiou.mongodb.net/puppySpa?retryWrites=true&w=majority";
const client =  new MongoClient(process.env.MONGO_URL);
const databaseName = 'puppySpa';


async function natDbCon(collectionName){
    let result = await client.connect();
    let db = result.db(databaseName);
    return db.collection(collectionName);
}
 

module.exports = natDbCon;