const router = require("express").Router();
const Journey = require("../models/Journey");
const User = require("../models/User");

router.post("/journeys", (req, res) => {
  //   console.log(req.user._id);
  const origin = req.body.from;
  const originId = req.body.fromId;
  const destination = req.body.to;
  const destinationId = req.body.toId;
  const date = req.body.date;
  let journeyInfo = {
    "origin.id": originId,
    "origin.name": origin,
    "destination.id": destinationId,
    "destination.name": destination,
    date
  };
  Journey.create(journeyInfo);
  // console.log(journeyInfo);
  Journey.findOne(
    { "origin.id": originId } && { "destination.id": destinationId }
  ).then(journeyDetail => {
    console.log("deatil here: " + journeyDetail);
    User.findById(req.user._id).then(user => {
      if (
        !user.favourites.includes(
          // journeyDetail.origin.id && journeyDetail.destination.id
          journeyDetail._id
        )
      ) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { favourites: journeyDetail._id }
          },
          { new: true }
        )
          // console
          //   .log(favourites)
          .populate({ path: "favourites" })
          .then(result => {
            res.json();
          });
      } else {
        res.json();
      }
    });
  });
});

module.exports = router;
