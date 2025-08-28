const express = require("express");

//  Creating the instance of express server -> app server
const app = express();

// creating a port to listen the request

const port = 3000;

// Request handler
app.get("/user", (req, res) => {
  res.send({
    name: "Divyanshu",
    occupation: "Software Developer",
  });
});

app.post("/user", (req, res) => {
  // Will do the computation and save data to database
  res.send("Saved data to database");
});

app.delete("/user", (req, res) => {
  // Will do the computation and delete the data from database
  res.send("Data deleted from database");
});

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}`);
});
