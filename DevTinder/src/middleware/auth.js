// This function is our middleware. It has access to req, res, and next.
const checkAuth = (req, res, next) => {
  // In a real app, you'd get the token from the request headers
  // For now, we'll keep it simple
  const token = "xyz";

  // The corrected logic!
  if (token !== "xyz") {
    // If the token is invalid, stop here and send an error response.
    return res.status(401).send("Unauthorized: Invalid token");
  }

  // If the token is valid, call next() to pass control to the actual route handler.
  console.log("Authentication successful!");
  next();
};

// This line makes the function available to other files in our project.
module.exports = { checkAuth };




