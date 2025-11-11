const express = require("express");
const connectToDB = require("./config/database");
const { checkAuth, userAuth } = require("./middleware/auth");

const { UserModel } = require("./models/user");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Console loging the request -> body
  console.log("the request body data send is -> ", req.body);

  try {
    // Creating the instance of modal for saving data in database
    const User = new UserModel(req.body);
    await User.save();
    res.send("Data saved to DB");
  } catch (err) {
    res.status(400).send("Error in saving the data", err.message);
  }
});

// Sending all data to frontend
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    res.send(allUsers); // res.json(allUsers)
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Sending Single data to frontend based on emailID
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await UserModel.findOne({ emailId: userEmail });
    // 3. Handle case where user is not found
    if (!user) {
      return res.status(404).send("User Dont exist");
    }
    res.status(200).json(user); // Sending the data to frontend
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
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
