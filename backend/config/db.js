const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/estate`);
    console.log("Connected to MONGODB");
  } catch {
    (err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    };
  }
};

module.exports = db;
