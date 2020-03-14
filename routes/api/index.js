const router = require("express").Router();
const userRoutes = require("./users");
const petRoutes = require("./pets");
const searchRoutes = require("./search");

router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/search", searchRoutes);

module.exports = router;
