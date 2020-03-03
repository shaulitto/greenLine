let mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to DB");
const stations = require("./full.json");

const Station = require("../models/Station");
stations.forEach(elem => {
  if (elem.category < 5) {
    Station.create(elem)
      .then(res => {
        console.log("data added");
      })
      .catch(err => {
        console.log(err);
      });
  }
});
