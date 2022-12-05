require('dotenv').config();
let express = require("express");
let router = express.Router();
let Puppys = require("../schemas/puppiesSchema.js");
let PuppyShcema = require("../schemas/PuppyShcema.js")
const dbConnect = require("../mongodb.js");
const natDbCon = require('../monoDbNative.js');


// Checkout dog serviced pups on current date
router.patch("/checkout/:dogName", (req, res) => {
  dbConnect();
  let checkedPup = PuppyShcema.findOneAndUpdate(
    { Name: req.params.dogName },
    { OutStatus: true },
    {new: true},
    (err, result)=>{
      if(err) throw err;
      res.send(result)
      // Below code to remove from the current collection and store to another colleciton can be useful further
      // else{
      //   let movePupTo = PuppyShcema.insertMany({
      //     data: result
      //   }, (errr, insertedData) => {
      //     if(errr) throw errr;
      //     res.send(insertedData)
      //   })
      // }
    }
  );  
});


// Sorting the pups list in descending order
router.get("/sortedlist", async(req, res) => {
  let data = Puppys.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, docs) {
      if (err) throw err;
      res.send(docs);
    });

});


// Adding a pup api
router.post("/addPuppy", async (req, res) => {
  dbConnect();
  let Pup = new PuppyShcema(req.body)
  try {
    await Pup.save();
    // console.log("Puppy Added");
    let saveToMainRecord = new Puppys(req.body)
    saveToMainRecord.save();
    res.send(Pup);
  } catch (error) {
    res.status(500).send(error);
  }

});

// To fetch datewise collection
router.get("/datewise/:date", async(req, res)=>{
  const puppsCollection = await natDbCon(req.params.date);
  const allPups = await puppsCollection.find({}).toArray();
  res.send(allPups)

})


// Live search by name router
router.get("/livesearch/:liveupname", async(req, res)=>{
  const db = await natDbCon("puppiesdetails");
  const dataByName = await db.find({ Name: {$regex: req.params.liveupname, $options: 'i'}}).toArray();
  if (dataByName.length === 0) {
    return res.send([]);
  } else {
    return res.send(dataByName);
  }
})

// No of total pups registered till date 
router.get("/totalPups", (req, res)=>{
  dbConnect();
  let data = Puppys.find({}, (err, result)=>{
    if(err) throw err;
    res.send(result);
  })
})

// Search by Puppy Name from main db
router.get("/:pupname", (req, res)=>{
  dbConnect();
  let data = Puppys.find({Name: req.params.pupname}, (err, result)=>{
    if(err) throw err;
    res.send(result);
  })
})

// Get current pups which have not been served off
router.get("/", (req, res) => {
  dbConnect();
  let allPups = PuppyShcema.find({OutStatus: {$ne: true}}, (err, puppyList) => {
    if (err) throw err;
    res.send(puppyList);
  });
});


module.exports = router;