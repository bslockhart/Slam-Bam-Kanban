const PageController = require("./PageController");
const UserController = require("./UserController");

module.exports = {
  PageController,
  UserController,
};

var button = document.getElementById("create-task");

button.addEventListener("click", displayDate);
