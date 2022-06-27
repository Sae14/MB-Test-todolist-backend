const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const todoRoutes = require("./routes/todo");
const { sequelize } = require("./models/index");

const app = express();

try {
  sequelize.authenticate();
  console.log("Connection to database successfull");
} catch (error) {
  console.error("Connection to dabase failed", error);
}

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/api/todos", todoRoutes);

module.exports = app;
