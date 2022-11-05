const User = require("./User");

module.exports = {
  User,
};

var button = document.getElementById("create-task");

button.addEventListener("click", displayDate);
