const router = require("express").Router();
const Station = require("../models/Station");

router.get("/stations", (req, res) => {
  Station.find().then(stations => {
    res.json(stations);
  });
});
module.exports = router;
