const express = require("express");

//  Creating the instance of express server -> app server
const app = express();

// creating a port to listen the request

const port = 3000;

// Request handler
app.use((req, res) => {
  res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello Hello");
});

app.use("/test", (req, res) => {
  res.send("Taking the test");
});

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}`);
});
