const mongoose = require("mongoose");
require('dotenv').config()
const { DB_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("DB Connection Failed.");
      console.log(error);
      process.exit(1);
    });
};
