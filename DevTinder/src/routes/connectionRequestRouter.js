const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestRouter = express.Router();
const statusCheck = require("../utilsOrHelperFolder/validateStatusOfConnectionRequest");

const { ConnectionRequestModel } = require("../models/connectionRequestSchema");

// api for sending the connection request
connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      // toUserId is the user id of the user to whom the request is sent
      const { status, toUserId } = req.params;

      // validating the status which can be either interested or ignored.
      // The DB schema allows 4 statuses: ignored, interested, accepted, rejected. However, when sending a request, you should only be allowed to send "interested" or "ignored". You cannot force a request to be "accepted" immediately.
      const isStatusValid = statusCheck(status);

      if (!isStatusValid) {
        return res.status(400).send({
          message: "Invalid status",
          statusSend: status,
        });
      }

      //  _id is the user id of the user who sent the request: we get this id from the token
      const { _id } = req.user;
      const fromUserId = _id;

      // Creating connection Request which has the fromUserId, toUserId and status
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      // Saving the connection request to the database
      const data = await connectionRequest.save();

      res.json({
        message: "Connection Request Sent Successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  }
);

module.exports = { connectionRequestRouter };
