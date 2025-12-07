const express = require("express");
const signUpValidation = require("../utilsOrHelperFolder/signUpValidation");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");

// singup -> Registering the user
authRouter.post("/signup", async (req, res) => {
  try {
    signUpValidation(req);

    // Encrypting the password:
    const { firstName, lastName, emailId, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Creating the instance of modal for saving data in database
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
    });
    // Saving the data in database
    await user.save();
    res.send("Data saved to DB");
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error in saving the data", error: err.message });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    // Extracting the emailId and Password from the request body
    const { emailId, password } = req.body;

    // checking the user in the database using email
    const user = await UserModel.findOne({ emailId: emailId });

    // if user is not found then throw error
    if (!user) {
      throw new Error("You have not registered ");
    }
    // Checking password with database Password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    // if password is not matched then show invalid Credentials
    if (!isPasswordMatched) {
      throw new Error("Invalid credentials");
    }

    // Creating the token -> call the getJWT function on the isntance of the user which is extracted above -> const user = await UserModel.findOne({ emailId: emailId });
    // getJWT is a function which is defined in the user model
    const token = await user.getJWT(); // Much cleaner!

    // Sending the cookie to the frontend with expiry time
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // Example: Cookie expires in 8 hours
      httpOnly: true, // Prevent JavaScript access (Security against XSS)
      // secure: true, // Only send over HTTPS (Security against Snooping). Currently commenting as we are in development mode.
    });
    res.send("Login successful");

    // comparing the password
  } catch (err) {
    res.status(400).send({ message: "Error in login", error: err.message });
  }
});

module.exports = { authRouter };
