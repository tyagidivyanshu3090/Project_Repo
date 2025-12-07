const express = require("express");
const connectToDB = require("./config/database");
const { userAuth } = require("./middleware/auth");
const signUpValidation = require("./utilsOrHelperFolder/signUpValidation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { UserModel } = require("./models/user");

// Importing the Router modules
const { authRouter } = require("./routes/authRouter");
const { profileRouter } = require("./routes/profileRouter");
const { connectionRequestRouter } = require("./routes/connectionRequestRouter");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/connectionRequest", connectionRequestRouter);

// // Getting profile
// app.post("/profile", userAuth, async (req, res) => {
//   try {
//     // Extracting the user data from the request which is added by the userAuth middleware
//     const user = req.user;
//     res.send(user);
//   } catch (err) {
//     res.status(400).send({ message: "Error in profile", error: err.message });
//   }
// });

connectToDB()
  .then(() => {
    console.log("database connected");
    app.listen(PORT, (req, res) => {
      console.log(`The server is running at port number ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error received");
  });
