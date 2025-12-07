const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const validateEditProfileData = require("../utilsOrHelperFolder/validateEditProfileData");

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

module.exports = { profileRouter };
