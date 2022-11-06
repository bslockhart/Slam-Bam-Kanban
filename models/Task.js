const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/config");

// create your Task model here
class Task extends Model {
}

// create fields/columns for Task model
Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isIn: [['to do', 'in progress', 'in review', 'done']]
      }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Project",
        key: "id",
      },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Task",
  }
);

module.exports = Task;
