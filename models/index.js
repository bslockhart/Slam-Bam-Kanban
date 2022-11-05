// import all models
const Project = require("./Project");
const User = require("./User");
const Task = require("./Task");

// create associations - very important!
User.hasMany(Project, {
  foreignKey: "user_id",
});

Project.belongsTo(User, {
  foreignKey: "user_id",
});

Task.belongsTo(User, {
  foreignKey: "user_id",
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
});

User.hasMany(Task, {
  foreignKey: "user_id",
});

Project.hasMany(Task, {
  foreignKey: "project_id",
});

module.exports = { User, Project, Task };
