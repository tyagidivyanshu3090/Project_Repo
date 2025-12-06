const express = require("express");
const signUpValidation = require("../utilsOrHelperFolder/signUpValidation");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

authRouter.post("signup", async (req, res) => {
  try {
    signUpValidation(req);
    // Encrypting the password:
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Creating the instance of modal for saving data in database
    const user = new UserModel({
      firstName,
      lastName,
      email,
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

module.exports = { router };
