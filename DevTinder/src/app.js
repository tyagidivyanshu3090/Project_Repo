const express = require("express");
const { checkAuth, userAuth } = require("./middleware/auth");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

// Middleware
app.use("/devtinder", checkAuth);

// Separate route
app.get("/user/getData", userAuth, (req, res) => {
  res.send("The user name is Divyanshu tyagi");
});

app.get("/devtinder/getuser", (req, res) => {
  res.send({
    name: "Divyanshu Tyagi",
    occupation: "Software Developer",
  });
});

app.delete("/devtinder/deleteuser", (req, res) => {
  res.send("The user is deleted");
});

app.listen(PORT, (req, res) => {
  console.log(`The server is running at port number ${PORT}`);
});
