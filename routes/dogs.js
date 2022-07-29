require('dotenv').config();
let express = require("express");
let router = express.Router();
let Puppys = require("../schemas/puppiesSchema.js");
let PuppyShcema = require("../schemas/PuppyShcema.js")
const dbConnect = require("../mongodb.js");
const natDbCon = require('../monoDbNative.js');



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


router.get("/sortedlist", async(req, res) => {
  let data = Puppys.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, docs) {
      if (err) throw err;
      res.send(docs);
    });

});


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


router.get("/datewise/:date", async(req, res)=>{
  const puppsCollection = await natDbCon(req.params.date);
  const allPups = await puppsCollection.find({}).toArray();
  res.send(allPups)

})

router.get("/:pupname", (req, res)=>{
  dbConnect();
  let data = Puppys.find({Name: req.params.pupname}, (err, result)=>{
    if(err) throw err;
    res.send(result);
  })
})


router.get("/", (req, res) => {
  dbConnect();
  let allPups = PuppyShcema.find({OutStatus: {$ne: true}}, (err, puppyList) => {
    if (err) throw err;
    res.send(puppyList);
  });
});


module.exports = router;