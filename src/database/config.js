const mongoose = require("mongoose");
const config = require("../config");

const dbConnection = async () => {
  try {
    const uri = config.MONGO_ATLAS_URI;

    try {
        await mongoose.connect(uri, {
          useUnifiedTopology: true
        });
    
        console.log("🚀 ~ Database connected");
    } catch (error) {
        console.log("🚀 ~ file: config.js:19 ~ dbConnection ~ error:", error);
    }
  } catch (error) {
    throw new Error("Error when connection with database");
  }
};

module.exports = {
  dbConnection,
};
