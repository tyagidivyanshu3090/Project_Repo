const express = require("express");
const connectToDB = require("./config/database");
const { userAuth } = require("./middleware/auth");
const signUpValidation = require("./utilsOrHelperFolder/signUpValidation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { UserModel } = require("./models/user");
const { createToken } = require("./utilsOrHelperFolder/jwtTokenCreation");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// adding the user
app.post("/signup", async (req, res) => {
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

// login api -> check emailId and password is correct or not
app.post("/login", async (req, res) => {
  try {
    // Extracting the emailId and password from the request body
    const { emailId, password } = req.body;
    // checking the user in datase
    const user = await UserModel.findOne({ emailId: emailId });
    // if user exist then checking password with hashed password otherwise return invalid credentials
    if (!user) {
      throw new Error("Invalid credential");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // if password is matched then return success message otherwise return invalid credentials
    if (!isPasswordMatched) {
      throw new Error("Invalid credential");
    } else {
      // Creating the token
      // const token = await jwt.sign({ _id: user._id }, "DevTinder@3090");
      const token = await createToken({ _id: user._id });
      // Sending the cookie to the frontend with expiry time
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // Example: Cookie expires in 8 hours
      });
      res.send("Login successful");
    }
  } catch (err) {
    res.status(400).send({ message: "Error in login", error: err.message });
  }
});

// Getting profile
app.post("/profile", userAuth, async (req, res) => {
  try {
    // Extracting the user data from the request which is added by the userAuth middleware
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: "Error in profile", error: err.message });
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
