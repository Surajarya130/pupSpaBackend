const mongoose = require("mongoose");

const waitListSchema = mongoose.Schema({
        data: Object
})

let collName = `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`

module.exports = mongoose.model(collName, waitListSchema)