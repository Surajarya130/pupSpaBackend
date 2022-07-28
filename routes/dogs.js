require('dotenv').config();
let express = require("express");
let router = express.Router();
let Puppys = require("../schemas/puppiesSchema.js");
let WaitListSchema = require("../schemas/waitListSchema.js")
let dbConnect = require("../mongodb.js");



router.patch("/checkout/:dogName", (req, res) => {
  dbConnect();
  let checkedPup = Puppys.findOneAndUpdate(
    { Name: req.params.dogName },
    { OutStatus: true },
    {new: true},
    (err, result)=>{
      if(err) throw err;
      else{
        let movePupTo = WaitListSchema.insertMany({
          data: result
        }, (errr, insertedData) => {
          if(errr) throw errr;
          res.send(insertedData)
        })
        // let removePupFrom = Puppys.deleteOne({Name: result.Name}, (err, removedPup)=>{
        //     if (err) throw err;
        //     console.log(removedPup)
        // })
      }
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
  let Pup = new Puppys(req.body);
  try {
    await Pup.save();
    console.log("Puppy Added");
    res.send(Pup);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get("/datewise", (req, res)=>{
  console.log("Date wise")
  res.send("date wise list here")

})


router.get("/", (req, res) => {
  dbConnect();
  let allPups = Puppys.find({OutStatus: {$ne: true}}, (err, puppyList) => {
    if (err) throw err;
    res.send(puppyList);
  });
});


module.exports = router;
