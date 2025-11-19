const express = require("express");
const connectToDB = require("./config/database");
const { checkAuth, userAuth } = require("./middleware/auth");
const signUpValidation = require("./utilsOrHelperFolder/signUpValidation");
const bcrypt = require("bcrypt");

const { UserModel } = require("./models/user");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

app.use(express.json());

// adding the user
app.post("/signup", async (req, res) => {
  // Console loging the request -> body
  console.log("the request body data send is -> ", req.body);

  try {
    // Validation of data
    signUpValidation(req);

    // Encrypting the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating the instance of modal for saving data in database
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("Data saved to DB");
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ message: "Error in saving the data", error: err.message });
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
    res.status(200).json(user); // Sending the data to frsesontend
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Finding the user using the ID
app.get("/userbyid", async (req, res) => {
  const UserById = req.body.userById;
  try {
    const user = await UserModel.findById(UserById);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Deleting the user using the id -> findByIdAndDelete
app.delete("/deleteuser", async (req, res) => {
  const userId = req.body.userById;
  console.log(userId);
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    // 4. Check if a user was actually found and deleted
    if (!user) {
      return res.status(404).send("User not found");
    }
    // 5. Send success message
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Updating the user
app.patch("/updateuser/:userById", async (req, res) => {
  const userId = req.param?.userById;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userID",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await UserModel.findByIdAndUpdate(userId, data, {
      new: true, // This returns the *new* updated document
      runValidators: true,
    });
    res.status(200).send("User Updated successfully");
  } catch (err) {
    res.status(500).send("Server error " + err.message);
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
