const express = require("express");
const mongoose = require("mongoose");
const entryModel = require("./model/entryModel");
var cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;
const mongoURI = process.env.MONGO_PROD_URI;

// middleware
app.use(express.json());
app.use(cors());
app.use("/", express.static("../frontend"));

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to MongoDB.Atlas..."));

// GET request to get game records
app.get("/game", (req, res) => {
  entryModel
    .find({})
    .then(allRecords => {
      // console.log(allRecords);
      return res.json(allRecords);
    })
    .catch(err => err.json(err));
});

// POST request to create a new game record
app.post("/game", (req, res) => {
  const { name, turns, time } = req.body;
  // console.log(name, turns, time)
  entryModel
    .create({ name, turns, time }) // talks to DB through mongoose
    .then(newGame => {
      res.json(newGame);
    })
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
