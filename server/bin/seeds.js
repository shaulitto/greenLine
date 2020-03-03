let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/greenLine");
console.log("Connected to DB");
const stations = require("./full.json.js.js");

const Station = require("../../models/Station");
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
