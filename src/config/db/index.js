// Using Node.js `require()`
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Blog_nodeJs_dev");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connect failure!!");
  }
}

module.exports = { connect };
