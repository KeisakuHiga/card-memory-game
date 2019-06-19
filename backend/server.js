const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
require("dotenv").config();
const mongoURI = process.env.MONGO_PROD;
const entryModel = require("./model/entryModel");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
app.use(express.json());
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(console.log("connected to mongodb"));
