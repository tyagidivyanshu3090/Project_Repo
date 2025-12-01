// For checking the user authentication

// Step 1: Importing the jwt-web-token package which is used for creating the token
const jwt = require("jsonwebtoken");

// Step 2: Defining the secret key which is used for creating the token
const secretKey = "DevTinder@3090";

// Importing the schema -> for fetching the user data
const { UserModel } = require("../models/user");

// Step 3: Creating the middleware function
const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedMessage = await jwt.verify(token, secretKey);
    console.log(decodedMessage);
    //  Destructuring the id -> Extract the User ID
    const { _id } = decodedMessage;
    // Geting the user data
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    // 5. Attach the User to the Request object
    // This allows the next function (API handler) to use this user data
    req.user = user;
    // 6. Move to the next Request Handler
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { checkAuth };
