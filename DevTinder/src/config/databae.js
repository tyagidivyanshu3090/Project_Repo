const mongoose = require("mongoose");

async function connectToDB() {
  const response = await mongoose.connect(
    "mongodb+srv://divyanshu422_db_user:Divyanshu3090@dev0tinder.wo2gq5y.mongodb.net/devTinder"
  );
  console.log("database connected");
}

connectToDB();
