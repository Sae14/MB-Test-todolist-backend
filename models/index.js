const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
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
