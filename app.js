//packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routers
const auth = require("./routers/auth");

//starter
const app = express();
const port = process.env.PORT;
const url = process.env.API_URL;

//middlewares
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(`${url}/auth`, auth);
app.use(`/:error`, (req, res) => {
  const { error } = req.params;
  res.send(`hi from error:- you write ${error} and there is no api like this`);
});

//connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("mongoose connection successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log(process.env.CONNECTION_STRING);
  });
app.listen(port, console.log(`server is listen in port:${port}`));
