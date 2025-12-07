const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const validateEditProfileData = require("../utilsOrHelperFolder/validateEditProfileData");
const bcrypt = require("bcrypt");

// view profile -> meaning sending the user details to frontend
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    // The data of the user is extracted in the userAuth middleware based on the token
    const user = req.user;
    res.send(user);
  } catch (err) {
    res
      .status(401)
      .send({ message: "Error in fetching the data", error: err.message });
  }
});

// edit profile -> meaning updating the user details in the database
// Using the Patch [ Partial modification ] not put [ replaces an entire resource with the data sent, setting missing fields to null]
profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    // // 1. Validate the Request Body
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid data");
    }
    // 2. Dynamic Update (The "Patch" Logic)
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    // 3. Save to Database
    await loggedInUser.save();
    // 4. Send Success Response
    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res
      .status(401)
      .send({ message: "Error in editing the data", error: err.message });
  }
});

// changePassword -> meaning allowing the user for updating the password
// Change Password API (often confused with "Forgot Password," but since the user is logged in, it's technically "Change Password").
// User will send the oldPassword and newPassword
profileRouter.patch("/changepassword", userAuth, async (req, res) => {
  try {
    // 1. Extract the oldPassword and newPassword from the request body
    const { oldPassword, newPassword } = req.body;
    // 2. Validate the Request Body
    if (!oldPassword || !newPassword) {
      throw new Error("Please provide the password");
    }
    if (oldPassword === newPassword) {
      throw new Error("New password should be different from old password");
    }

    const user = req.user;
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }

    // 3. Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);
    // 4. Saving the new password in the database
    await user.save();
    // 5. Send Success Response
    res.json({
      message: "Password changed successfully",
      data: user,
    });
  } catch (err) {
    res
      .status(401)
      .send({ message: "Error in changing the password", error: err.message });
  }
});

module.exports = { profileRouter };
