// Step 1: Import necessary libraries
// jsonwebtoken is used to verify the signature of the token to ensure it wasn't tampered with.
const jwt = require("jsonwebtoken");

// Importing the User Model to query the database.
// We need this to ensure the user actually exists in our system.
const { UserModel } = require("../models/user");

// Step 2: Define the Secret Key
// CAUTION: In a real project, store this in a .env file (process.env.JWT_SECRET) for security.
// This key acts like a digital signature password.
const secretKey = "DevTinder@3090";

// Step 3: The Middleware Function
// This function sits BETWEEN the Request and the Final Route Handler.
const userAuth = async (req, res, next) => {
  try {
    // A. READ THE TOKEN
    // We try to extract the 'token' from the browser's cookies.
    // Note: This requires the 'cookie-parser' middleware to be installed and used in app.js.
    const { token } = req.cookies;

    // B. VALIDATE PRESENCE
    // If there is no token, the user is definitely not logged in. Stop them here.
    if (!token) {
      throw new Error("Invalid token: Please log in again.");
    }

    // C. VERIFY THE TOKEN (The 'Ticket' Check)
    // jwt.verify checks if the token was created by US using our 'secretKey'.
    // It also checks if the token has expired.
    // If valid, it returns the decoded payload (data hidden inside: e.g., { _id: "...", iat: ... })
    const decodedMessage = await jwt.verify(token, secretKey);

    // D. EXTRACT USER ID
    // We retrieve the unique _id we hid inside the token during the Login process.
    const { _id } = decodedMessage;

    // E. FIND USER IN DATABASE (The 'Membership' Check)
    // Just because the token is valid doesn't mean the user is valid.
    // The user might have been deleted or banned 5 minutes ago. This check handles that.
    const user = await UserModel.findById(_id);

    if (!user) {
      throw new Error("User not found in database.");
    }

    // F. ATTACH USER TO REQUEST (The "Pro Move")
    // We attach the found user object to the 'req' object.
    // This passes the user data to the next function (e.g., the Profile API),
    // so the next function doesn't need to query the database again.
    req.user = user;

    // G. PASS CONTROL
    // Everything is good! 'next()' tells Express to move to the actual Route Handler.
    next();
  } catch (err) {
    // If ANY step above fails (token invalid, user not found, etc.),
    // we catch the error and send a 400 Bad Request response.
    if (err.name === "TokenExpiredError") {
        return res.status(401).send("Please login again! Session expired.");
    }
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
