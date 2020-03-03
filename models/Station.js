const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  type: String,
  id: String,
  name: String,
  category: Number,
  weight: Number,
  location: {
    type: Object,
    latitude: Number,
    longitude: Number
  },
  address: {
    city: String
  },
  hasParking: Boolean,
  hasLocalPublicTransport: Boolean,
  hasSteplessAccess: String,
  hasWifi: Boolean,
  hasTravelCenter: Boolean,
  hasCarRental: Boolean
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
