const jwt = require("jsonwebtoken");

const secretKey = "DevTinder@3090";

// creating token
const createToken = async (user) => {
  return await jwt.sign(user, secretKey, { expiresIn: "1d" });
  // const token = await jwt.sign({ _id: user._id }, "DevTinder@3090");
};

const validateJwtToken = async (token, secretKey) => {
  return await jwt.verify(token, secretKey);
};

module.exports = { createToken, validateJwtToken };
