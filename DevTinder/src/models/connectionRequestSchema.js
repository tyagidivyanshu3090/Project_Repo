const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // Enforce strict status values
      // Either we can use enum or we can use validator
      // enum is more readable
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      // validator is more flexible
      //   validator: {
      //     validator: (value) => {
      //       return value === "ignored" || value === "interested" || value === "accepted" || value === "rejected";
      //     },
      //     message: `{VALUE} is incorrect status type`,
      //   },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = { ConnectionRequestModel };
