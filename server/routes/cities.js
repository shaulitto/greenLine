const router = require("express").Router();
const Station = require("../models/Station");

filtering = (request, stations) => {
  //   console.log("function here");

  let filtered = stations.filter(el => {
    return el.address.city.toLowerCase().includes(request.toLowerCase());
  });
  //   console.log("function here");
  return filtered.sort((a, b) => {
    return b.weight - a.weight;
  });
};

router.post("/cities", (req, res) => {
  //   console.log(req.body);
  Station.find().then(stations => {
    // console.log("hello here");
    let resultFrom = filtering(req.body.from, stations);
    let resultTo = filtering(req.body.to, stations);
    // let filtered = stations.filter(el => {
    //   return el.address.city
    //     .toLowerCase()
    //     .includes(req.body.from.toLowerCase());
    // });
    // let ordered = filtered.sort((a, b) => {
    //   return b.weight - a.weight;
    // });
    // console.log("herereeeeeeeeeee", resultFrom, resultTo);
    res.json({
      resultFrom,
      resultTo
    });
  });
});
//   Station.find(req.params).then(stations => {
//     console.log(stations.address);
//     let filtered = stations.data.filter(el => {
//       return el.address.toLowerCase().includes(req.direction.toLowerCase());
//     });

//     if (direction === "to") {
//       resultTo: filtered;
//     } else {
//       resultFrom: filtered;
//     }
//     res.json(filtered);
//   });
module.exports = router;
