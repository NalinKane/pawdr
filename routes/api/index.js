const router = require("express").Router();
const userRoutes = require("./users");
const petRoutes = require("./pets");

router.use("/users", userRoutes);
router.use("/pets", petRoutes);

module.exports = router;
