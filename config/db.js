const mongoose = require("mongoose");
require("dotenv").config();


const connectToDatabase = async () => {
  const mongoDbUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(mongoDbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit application with error code
  }
};

module.exports = connectToDatabase;