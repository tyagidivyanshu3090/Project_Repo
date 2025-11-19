const validator = require("validator");
const signUpValidation = (req) => {
  // Checking for required fields firstName, lastName, emailId, password
  // Extract fields from request body
  const { firstName, lastName, emailId, password } = req.body;

  // Validate First Name
  if (!firstName) {
    throw new Error("Name is not valid!");
  }
  // Validate Last Name
  else if (!lastName) {
    throw new Error("Last Name is not valid!");
  }
  // Validate Email ID
  else if (!emailId) {
    throw new Error("Email ID is not valid!");
  }
  // Validate Password
  else if (!password) {
    throw new Error("Password is not valid!");
  }

  // Checking for valid email
  if (!validator.isEmail(emailId)) {
    throw new Error("Email ID is not valid!");
  }

  // Checking for valid password
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid!");
  }
};

module.exports = signUpValidation;
