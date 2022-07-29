const express = require("express");
const router = express.Router();
const dbConnect = require("../mongodb")
const PuppyShcema = require("../schemas/PuppyShcema")

router.post("/:pupName", async(req, res)=>{
    dbConnect();
    let wlData = new wLSchema(req.body);
    try {
        await wlData.save()
        res.send(wlData)
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;