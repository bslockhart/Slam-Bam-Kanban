// Requirements
const router = require("express").Router();
const { UserController } = require("../../controllers");

const isAuthenticated = require("../../middleware/isAuthenticated");

// Routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", isAuthenticated, UserController.logout);

module.exports = router;

// Get all tasks
app.get("/api/tasks", function (req, res) {
  db.task.findAll({}).then(function (dbBeers) {
    res.json(dbBeers);
  });
});

// Create a new task
app.post("/api/tasks", function (req, res) {
  db.task.create(req.body).then(function (dbBeer) {
    res.json(dbBeer);
  });
});
