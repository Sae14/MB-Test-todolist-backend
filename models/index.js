const { Sequelize, DataTypes } = require("sequelize");

MY_DB_NAME = process.env.DB_NAME;
MY_DB_USERNAME = process.env.DB_USERNAME;
MY_DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(MY_DB_NAME, MY_DB_USERNAME, MY_DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  timezone: "+02:00",
});

const Todo = sequelize.define("todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// force: false, alter: true
// (async () => {
//   await sequelize.sync();
//   console.log("Tables for all models were just (re)created!");
// })();

module.exports = { sequelize, Todo };
