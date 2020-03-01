const router = require("express").Router();
const Station = require("../models/Station");

filtering = (request, stations) => {
  let filtered = stations.filter(el => {
    return el.address.city.toLowerCase().includes(request.toLowerCase());
  });
  return filtered.sort((a, b) => {
    return b.weight - a.weight;
  });
};

router.post("/cities", (req, res) => {
  //   console.log(req.body);
  Station.find().then(stations => {
    let resultFrom = filtering(req.body.from, stations);
    let resultTo = filtering(req.body.to, stations);

    res.json({
      resultFrom,
      resultTo
    });
  });
});

module.exports = router;
