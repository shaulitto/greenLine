const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journeySchema = new Schema({
  origin: {
    type: String,
    id: String,
    name: String
  },
  destination: {
    type: String,
    id: String,
    name: String
  },
  date: Object
});

const Journey = mongoose.model("Journey", journeySchema);
module.exports = Journey;
