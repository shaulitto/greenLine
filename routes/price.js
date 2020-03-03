const moment = require("moment-timezone");
const { inspect } = require("util");
const prices = require("db-prices");
const router = require("express").Router();
const tz = "Europe/Berlin";
const Station = require("../models/Station");

const sortingAllTrips = allTrips => {
  const allTripsInOne = allTrips.flat();
  const uniques = [
    ...new Set(
      allTripsInOne.map(el => JSON.stringify(el.legs.map(ele => ele.line.id)))
    )
  ];

  const reducedArray = allTripsInOne.reduce((acc, val) => {
    const checkEquality = val.legs.map(el => el.line.id);
    const insideAcc = acc.find(el => {
      const checkIfInside = el.legs.map(ele => ele.line.id);
      return JSON.stringify(checkIfInside) === JSON.stringify(checkEquality);
    });
    if (!insideAcc) {
      return [...acc, val];
    } else return acc;
  }, []);
  return reducedArray;
};

let date;
let from;
let to;
router.get("/price", (req, res) => {
  date = req.query.date;
  from = req.query.fromId;
  to = req.query.toId;

  if (!parseInt(from) > 0 && !parseInt(to) > 0) {
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
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else if (!parseInt(from) > 0 || !parseInt(to) > 0) {
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
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else {
    prices(from, to, date).then(routes => {
      res.json(routes);
    });
  }
});

router.get("/firstPrice", (req, res) => {
  if (!parseInt(from) > 0 && !parseInt(to) > 0) {
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
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date, { class: 1 }));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else if (!parseInt(from) > 0 || !parseInt(to) > 0) {
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
        for (let i = 0; i < res[0].length; i++) {
          for (let j = 0; j < res[1].length; j++) {
            myPromises.push(prices(res[0][i], res[1][j], date, { class: 1 }));
          }
        }
        return myPromises;
      })
      .then(myPromises => {
        Promise.all(myPromises).then(results => {
          let sorted = sortingAllTrips(results);
          res.json(sorted);
        });
      });
  } else {
    prices(from, to, date, { class: 1 }).then(routes => {
      res.json(routes);
    });
  }
});
module.exports = router;
