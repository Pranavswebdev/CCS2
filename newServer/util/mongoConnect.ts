const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("Db Connected");
  } catch (error) {
    console.log("Connection Error", error);
  }
};

export default connectMongoDb;
