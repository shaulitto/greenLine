// const stations = require("./node_modules/db-stations/full.json");
const moment = require("moment-timezone");
const { inspect } = require("util");
const prices = require("db-prices");
const router = require("express").Router();
const tz = "Europe/Berlin";
const Station = require("../models/Station");

// axios.get("/api/test?date=");
// const when = moment
//   .tz(Date.now(), tz)
//   .hour(10)
//   .minute(30)
//   .second(0)
//   .day(1 + 7)
//   .toDate();

// const sortingAllTrips = allTrips => {
//   let newArrayOfAllTrips = [];

//   allTrips.forEach(ele => {
//     ele.forEach(trip => {
//       newArrayOfAllTrips.push(trip);
//     });
//   });

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

router.get("/price", (req, res) => {
  console.log("check for city here", req.query);
  const date = req.query.date;
  const from = req.query.fromId;
  const to = req.query.toId;
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
        fromArray = fromArray.slice(0, 10);
        //console.log(fromArray, "pushing something here");
        toArray = toArray.slice(0, 10);

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
          // let sortedByPrice = sortingAllTrips(results);
          res.json(results);
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
        fromArray = fromArray.slice(0, 10);
        toArray = toArray.slice(0, 10);

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
          // let sortedByPrice = sortingAllTrips(results);
          res.json(results);
        });
      });
  } else {
    prices(from, to, date).then(routes => {
      console.log(routes);
      // let sortedByPrice = routes.sort((a, b) => {
      //   return a.price.amount - b.price.amount;
      res.json(routes);
      // });
    });
  }
});

module.exports = router;
