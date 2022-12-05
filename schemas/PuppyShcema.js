const mongoose = require("mongoose");

const PuppyShcema = mongoose.Schema(
  {
    Name: String,
    Age: Number,
    Gender: String,
    Owner: String,
    Address: String,
    OutStatus: Boolean,
    ServiceType: String,
    InTime: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Normal date format
// let collName = `${new Date().getDate()}_${new Date().getMonth()+1}_${new Date().getFullYear()}`

let collName = `${new Date().getFullYear()}-${
  new Date().getMonth() < 10
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1
}-${
  new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()
}`;
module.exports = mongoose.model(collName, PuppyShcema);
