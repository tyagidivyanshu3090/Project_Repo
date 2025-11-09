const mongoose = require("mongoose");

async function connectToDB() {
  const response = await mongoose.connect(
    // "mongodb+srv://divyanshu422_db_user:Divyanshu3090@devtinder.qapahyz.mongodb.net/" Connection to cluster
    "mongodb+srv://divyanshu422_db_user:Divyanshu3090@devtinder.qapahyz.mongodb.net/devTinder" // connection to devTinder database inside the cluster
  );
}

module.exports = connectToDB; // "Here is a function for other files to use."
