const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value) {
      let allowedValue = ["male", "female", "other"];
      if (!allowedValue.includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },

  // gender: {
  //   type: String,
  //   enum: ["male", "female", "other"]
  // },

  photoUrl: {
    type: String,
    default:
      "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
  },
  about: {
    type: String,
    default: "User description not provided",
  },
  skills: {
    type: [String],
  },
},{
  timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };


