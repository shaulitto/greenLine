// const stations = require("./node_modules/db-stations/full.json");
const moment = require("moment-timezone");
const { inspect } = require("util");
const prices = require("db-prices");
const router = require("express").Router();

const tz = "Europe/Berlin";

const when = moment
  .tz(Date.now(), tz)
  .hour(10)
  .minute(30)
  .second(0)
  .day(1 + 7)
  .toDate();

router.get("/test", (req, res) => {
  prices("8000096", "8011160", when)
    .then(routes => {
      res.json(routes);
      console.log(inspect(routes, { depth: null }));
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});

module.exports = router;
