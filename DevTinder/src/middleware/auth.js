// For checking the user authentication

// Step 1: Importing the jwt-web-token package which is used for creating the token
const jwt = require("jsonwebtoken");

// Step 2: Defining the secret key which is used for creating the token
const secretKey = "DevTinder@3090";

// Step 3: Creating the middleware function
const checkAuth = async (token) => {
  return await jwt.verify(token, secretKey);
};

module.exports = { checkAuth };
