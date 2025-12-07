const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

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

module.exports = { profileRouter };
