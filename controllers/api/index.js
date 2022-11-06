const router = require("express").Router();
const userRoutes = require("./userRoutes");
const jobHunt = require("./job_api");
router.use("/users", userRoutes);
router.use("/jobs", jobHunt);
module.exports = router;
