// const express = require("express");

// //  Creating the instance of express server -> app server
// const app = express();

// // creating a port to listen the request

// const port = 3000;

// // Request handler
// app.get("/user", (req, res) => {
//   res.send({
//     name: "Divyanshu",
//     occupation: "Software Developer",
//   });
// });

// app.post(
//   "/user",
//   (req, res, next) => {
//     // Will do the computation and save data to database
//     console.log("First request handler is called ");
//     next();
//   },
//   (req, res) => {
//     res.send("Saved data to database");
//   }cmd
// );

// app.delete("/user", (req, res) => {
//   // Will do the computation and delete the data from database
//   res.send("Data deleted from database");
// });

// app.get(
//   "/userdata",
//   (req, res, next) => {
//     console.log("First request handler");
//     next();
//   },
//   (req, res) => {
//     console.log("Secons request handler");
//     res.send("User data from 2nd handler");
//   }
// );

// app.listen(port, () => {
//   console.log(`Server is successfully listening on port ${port}`);
// });

const express = require("express");

const app = express(); //  Creating the instance of express server -> app server

const PORT = 3000;

// Middleware
app.use("/devtinder", (req, res, next) => {
  const token = "xyz";
  if (!token === "xyz") {
    res.send("Invalid token");
  } else {
    next();
  }
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
