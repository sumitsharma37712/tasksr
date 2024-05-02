const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = "mongodb://127.0.0.1:27017/Tasks"; //for localserver
// const MONGO_URL = process.env.MONGOURL; //for mongoose dataserver

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfull connect for MongoDB databse");
  })
  .catch((err) => {
    console.error("Error connecting to the MongoDB database:", err);
  });
