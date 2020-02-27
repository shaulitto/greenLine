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

router.get("/price", (req, res) => {
  const date = req.query.date;
  // const date = new Date("2020-03-07T10:30");
  console.log("before :", date);

  // form for date and time input instead of when=moment => "2020-02-27T11:51:00.000Z"

  prices("8000096", "8011160", date)
    .then(routes => {
      console.log("WHEN:", date);
      res.json(routes);
      // console.log(inspect(routes, { depth: null }));
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});

module.exports = router;
