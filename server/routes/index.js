/* We'll centralize our routes imports to this file to keep our code clean */

const router = require("express").Router();
const usersRoutes = require("./users");
const priceRoutes = require("./price");

router.get("/", (req, res) => {
  res.send("This is home");
});

router.use("/api/auth", usersRoutes);
router.use("/api", priceRoutes);

module.exports = router;
