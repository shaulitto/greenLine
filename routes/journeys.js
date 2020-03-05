const router = require("express").Router();
const Journey = require("../models/Journey");
const User = require("../models/User");

router.post("/journeys", (req, res) => {
  const origin = req.body.from;
  const originId = req.body.fromId;
  const destination = req.body.to;
  const destinationId = req.body.toId;
  const date = req.body.date;
  let journeyInfo = {
    originId,
    origin,
    destinationId,
    destination,
    date
  };
  // console.log("journeyinfo", journeyInfo);
  //   Journey.create(journeyInfo);
  //   // console.log(journeyInfo);
  //   Journey.findOne({ originId } && { destinationId }).then(journeyDetail => {
  //     console.log("deatil here: " + journeyDetail);
  //     console.log(req.user);
  //     User.findById(req.user._id).then(user => {
  //       console.log(user);
  //       if (!user.favourites.includes(journeyDetail._id)) {
  //         User.findByIdAndUpdate(
  //           req.user._id,
  //           {
  //             $push: { favourites: journeyDetail._id }
  //           },
  //           { new: true }
  //         )
  //           .populate({ path: "favourites" })
  //           .then(result => {
  //             res.json(journeyDetail);
  //           });
  //       } else {
  //         res.json(journeyDetail);
  //       }
  //     });
  //   });
  // });
  Journey.create(journeyInfo).then(journeyDetailInfo => {
    User.findById(req.user._id).then(user => {
      // console.log(user);
      if (!user.favorites.includes(journeyDetailInfo._id)) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { favorites: journeyDetailInfo._id }
          },
          { new: true }
        )
          .populate({ path: "favourites" })
          .then(result => {
            res.json(journeyDetailInfo);
          });
      } else {
        res.json(journeyDetailInfo);
      }
    });
  });
});
module.exports = router;
