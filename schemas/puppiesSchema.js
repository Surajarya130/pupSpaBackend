let mongoose = require("mongoose");

let puppySchema = mongoose.Schema({
    Name: String,
    Age : Number,
    Gender: String,
    Ownder: String,
    Address: String,
    OutStatus: Boolean,
    ServiceType: String,
    InTime: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
})

module.exports = mongoose.model("puppiesdetail", puppySchema)
