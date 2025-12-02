const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password: " + value);
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email address: " + value);
          }
          return true;
        },
      },
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "User description not provided",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// We are attaching a method named 'getJWT' to the userSchema
userSchema.methods.getJWT = async function () {
  // 'this' refers to the specific user document calling this function
  const user = this;
  // Create the token
  const token = await jwt.sign({ _id: user._id }, "DevTinder@3090", {
    expiresIn: "7d",
  });
  // Return the token back to whoever called this function
  return token;
};

// Mongoose method for password

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  const hassedPassword = user.password;
  // return await bcrypt.compare(password, user.password);
  return await bcrypt.compare(password, hassedPassword);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
