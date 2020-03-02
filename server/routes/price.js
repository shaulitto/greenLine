// const stations = require("./node_modules/db-stations/full.json");
const moment = require("moment-timezone");
const { inspect } = require("util");
const prices = require("db-prices");
const router = require("express").Router();

const tz = "Europe/Berlin";

// axios.get("/api/test?date=");
// const when = moment
//   .tz(Date.now(), tz)
//   .hour(10)
//   .minute(30)
//   .second(0)
//   .day(1 + 7)
//   .toDate();

// const when = moment
// .tz(Date.now(), tz)
// .hour(date.slice(11,1))
// .minute(date.slice(14,15))
// .second(0)
// .day(1 + 7)
// .toDate();

// form for date and time input instead of when=moment => "2020-02-27T11:51:00.000Z"
let date;
let from;
let to;
router.get("/price", (req, res) => {
  date = req.query.date;
  from = req.query.fromId;
  to = req.query.toId;

  prices(from, to, date, { class: 2 })
    .then(routes => {
      res.json(routes);
      //console.log(inspect(routes, { depth: null }));
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});

router.get("/firstPrice", (req, res) => {
  prices(from, to, date, { class: 1 })
    .then(routes => {
      res.json(routes);
      // inspect(routes, { depth: null });
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
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

// const axios = require('axios');
// const myPromises = []
// for (let i = 0; i < 5; i++) {
//   for (let j = 0; j < 10; j++) {       myPromises.push(axios.get('http://fakeapi.com/'+i+'/'+j))
//   }
// }
// Promise.all(myPromises).then(results => {
//   console.log(results)
// })
