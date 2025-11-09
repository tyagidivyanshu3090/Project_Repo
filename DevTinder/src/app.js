const express = require("express");
const connectToDB = require("./config/database");
const { checkAuth, userAuth } = require("./middleware/auth");

const { UserModel } = require("./models/user");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Divyanshu",
    lastName: "Tyagi",
    emailId: "divyanshu422@gmail.com",
    password: "abcd@1234",
  };
  // Creating the instance of userModal
  const user = new UserModel(userObj);
  await user.save();
  res.send("Data saved to database");
});

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

// // Middleware
// app.use("/devtinder", checkAuth);

// // Separate route
// app.get("/user/getData", userAuth, (req, res) => {
//   res.send("The user name is Divyanshu tyagi");
// });

// app.get("/devtinder/getuser", (req, res) => {
//   res.send({
//     name: "Divyanshu Tyagi",
//     occupation: "Software Developer",
//   });
// });

// app.delete("/devtinder/deleteuser", (req, res) => {
//   res.send("The user is deleted");
// });
