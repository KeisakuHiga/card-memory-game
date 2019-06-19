const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
require("dotenv").config();
const mongoURI = process.env.MONGO_PROD;
const entryModel = require("./model/entryModel");
app.use(express.json());
<<<<<<< HEAD
var cors = require("cors");
app.use(cors());
=======
app.use(express.static('../frontend'))
let result = require("../frontend/index");
console.log(result);
>>>>>>> d9c4e93f862a8fbb44a1c3dd945f3a178b40cb52

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"));

// GET request to get game records
app.get("/game", (req, res) => {
  entryModel
    .find({})
    .then(allRecords => {
      console.log(allRecords);
      return res.json(allRecords);
    })
    .catch(err => err.json(err));
});

// POST request to create a new game record
app.post("/results", (req, res) => {
  const { id, turns, time } = result;
  const { name } = req.body;

  console.log(result);

  entryModel
    .create({ id, name, turns, time }) // talks to DB through mongoose
    .then(newGame => {
      res.json(newGame);
    })
    .catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
