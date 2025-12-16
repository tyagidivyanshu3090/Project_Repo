const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestRouter = express.Router();

// api for sending the connection request
connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  (req, res) => {
    try {
      // toUserId is the user id of the user to whom the request is sent
      const { status, toUserId } = req.params;
      //  _id is the user id of the user who sent the request: we get this id from the token
      const { _id } = req.user;
      const fromUserId = _id;
    
    } catch (err) {}

  }
);

module.exports = { connectionRequestRouter };



