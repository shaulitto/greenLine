/* We'll centralize our routes imports to this file to keep our code clean */

const router = require("express").Router();
const usersRoutes = require("./users");
<<<<<<< HEAD
const priceRoutes = require("./price");

=======
const testerRoutes = require("./tester");
const stations = require("./stations");
>>>>>>> d9546df1b91163e7f2eee9c08e8d49c49eead426
router.get("/", (req, res) => {
  res.send("This is home");
});

router.use("/api/auth", usersRoutes);
<<<<<<< HEAD
router.use("/api", priceRoutes);
=======
router.use("/api", testerRoutes);
router.use("/", stations);
>>>>>>> d9546df1b91163e7f2eee9c08e8d49c49eead426

module.exports = router;
