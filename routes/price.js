// const stations = require("./node_modules/db-stations/full.json");
//const moment = require("moment-timezone");
//const { inspect } = require("util");
const prices = require("db-prices");
const router = require("express").Router();
//const tz = "Europe/Berlin";
const Station = require("../models/Station");

const sortingAllTrips = allTrips => {
  let newArrayOfAllTrips = [];

  allTrips.forEach(ele => {
    ele.forEach(trip => {
      newArrayOfAllTrips.push(trip);
    });
  });
  return newArrayOfAllTrips;
};

//   newArrayOfAllTrips.sort((a, b) => {
//     return a.price.amount - b.price.amount;
//   });

//   console.log("newArrayOfAllTrips", newArrayOfAllTrips);
//   // return newArrayOfAllTrips;
//   const onlyUniqueTrips = []
//   newArrayOfAllTrips.forEach(trip => {
//     if (!onlyUniqueTrips.includes(trip.origin.name || trip.destination.name)
//   })
// };
let date;
let from;
let to;
router.get("/price", (req, res) => {
  console.log("check for city here", req.query);
  date = req.query.date;
  from = req.query.fromId;
  to = req.query.toId;
  console.log(from, to);
  console.log("before :", date);

  if (!parseInt(from) > 0 && !parseInt(to) > 0) {
    console.log("IT IS A STRING!");
    var fromArray = [];
    var toArray = [];
    Station.find()
      .then(stations => {
        stations.forEach(s => {
          if (s.address.city.includes(from)) {
            fromArray.push({ id: s.id, weight: s.weight });
          }
          if (s.address.city.includes(to)) {
            toArray.push({ id: s.id, weight: s.weight });
          }
        });

        toArray = toArray.sort((a, b) => {
          return b.weight - a.weight;
        });

        fromArray = fromArray.sort((a, b) => {
          return b.weight - a.weight;
        });
        fromArray = fromArray.slice(0, 5);
        //console.log(fromArray, "pushing something here");
        toArray = toArray.slice(0, 5);

        var outputFrom = fromArray.map(el => {
          return el.id;
        });
        var outputTo = toArray.map(el => {
          return el.id;
        });

        return [outputFrom, outputTo];
      })
      .then(res => {
        let myPromises = [];
        console.log("should be array of IDs", res);
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          console.log("array of array here", results);

          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else if (!parseInt(from) > 0 || !parseInt(to) > 0) {
    console.log("IT IS A STRING!");
    var fromArray = [];
    var toArray = [];
    Station.find()
      .then(stations => {
        stations.forEach(s => {
          if (s.address.city.includes(from)) {
            fromArray.push({ id: s.id, weight: s.weight });
          }
          if (s.address.city.includes(to)) {
            toArray.push({ id: s.id, weight: s.weight });
          }
        });

        toArray = toArray.sort((a, b) => {
          return b.weight - a.weight;
        });

        fromArray = fromArray.sort((a, b) => {
          return b.weight - a.weight;
        });
        fromArray = fromArray.slice(0, 5);
        toArray = toArray.slice(0, 5);

        var outputFrom = fromArray.map(el => {
          return el.id;
        });
        var outputTo = toArray.map(el => {
          return el.id;
        });

        return [outputFrom, outputTo];
      })
      .then(res => {
        let myPromises = [];
        console.log("should be array of IDs", res);
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          console.log("array of array here", results);
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else {
    prices(from, to, date).then(routes => {
      // console.log(routes);
      // let sortedByPrice = routes.sort((a, b) => {
      //   return a.price.amount - b.price.amount;
      res.json(routes);
      // });
    });
  }
});

router.get("/firstPrice", (req, res) => {
  if (!parseInt(from) > 0 && !parseInt(to) > 0) {
    console.log("IT IS A STRING!");
    var fromArray = [];
    var toArray = [];
    Station.find()
      .then(stations => {
        stations.forEach(s => {
          if (s.address.city.includes(from)) {
            fromArray.push({ id: s.id, weight: s.weight });
          }
          if (s.address.city.includes(to)) {
            toArray.push({ id: s.id, weight: s.weight });
          }
        });

        toArray = toArray.sort((a, b) => {
          return b.weight - a.weight;
        });

        fromArray = fromArray.sort((a, b) => {
          return b.weight - a.weight;
        });
        fromArray = fromArray.slice(0, 5);
        //console.log(fromArray, "pushing something here");
        toArray = toArray.slice(0, 5);

        var outputFrom = fromArray.map(el => {
          return el.id;
        });
        var outputTo = toArray.map(el => {
          return el.id;
        });

        return [outputFrom, outputTo];
      })
      .then(res => {
        let myPromises = [];
        console.log("should be array of IDs", res);
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date, { class: 1 }));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          console.log("array of array here", results);
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else if (!parseInt(from) > 0 || !parseInt(to) > 0) {
    console.log("IT IS A STRING!");
    var fromArray = [];
    var toArray = [];
    Station.find()
      .then(stations => {
        stations.forEach(s => {
          if (s.address.city.includes(from)) {
            fromArray.push({ id: s.id, weight: s.weight });
          }
          if (s.address.city.includes(to)) {
            toArray.push({ id: s.id, weight: s.weight });
          }
        });

        toArray = toArray.sort((a, b) => {
          return b.weight - a.weight;
        });

        fromArray = fromArray.sort((a, b) => {
          return b.weight - a.weight;
        });
        fromArray = fromArray.slice(0, 5);
        toArray = toArray.slice(0, 5);

        var outputFrom = fromArray.map(el => {
          return el.id;
        });
        var outputTo = toArray.map(el => {
          return el.id;
        });

        return [outputFrom, outputTo];
      })
      .then(res => {
        let myPromises = [];
        console.log("should be array of IDs", res);
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date, { class: 1 }));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          console.log("array of array here", results);
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else {
    prices(from, to, date, { class: 1 }).then(routes => {
      // console.log(routes);
      // let sortedByPrice = routes.sort((a, b) => {
      //   return a.price.amount - b.price.amount;
      res.json(routes);
      // });
    });
  }
});
//   prices(from, to, date, { class: 1 })
//     .then(routes => {
//       res.json(routes);
//       // inspect(routes, { depth: null });
//     })
//     .catch(err => {
//       console.error(err);
//       process.exit(1);
//     });
// });
// prices(from, to, date, { class: 2 })
//   .then(routes => {
//     console.log("WHEN:", date);
//     res.json(routes);
//     console.log("Second class:", routes.length);
//     // console.log(inspect(routes, { depth: null }));
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
module.exports = router;
