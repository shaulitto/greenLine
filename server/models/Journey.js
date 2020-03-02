const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journeySchema = new Schema({
  origin: {
    type: Object,
    id: String,
    name: String
  },
  destination: {
    type: Object,
    id: String,
    name: String
  },
  date: String
});

const Journey = mongoose.model("Journey", journeySchema);
module.exports = Journey;
