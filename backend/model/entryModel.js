const mongoose = require("mongoose");

const entryModel = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    turns: {
      type: Number,
      required: false
    },
    time: {
      type: Number,
      required: false
    }
  },
  { collection: "highscore" }
);
// you normally don't need to pass the name of the collection;
// the reason here is because otherwise it'll create a collection called pokemons
// we do not have a pokemons collection. So we specify the name of our collection here.

module.exports = mongoose.model("highscore", entryModel);
