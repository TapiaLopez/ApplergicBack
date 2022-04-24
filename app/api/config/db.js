const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const mongoDB = process.env.MONGO_DB;

const connect = async () => {
  try {
    const DB = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error to connect to DB", error);
  }
};

module.exports = {connect};