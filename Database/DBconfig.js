import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const MongoDBConnectionString = process.env.MONGODBCONNECTIONSTRING;
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MongoDBConnectionString);
    console.log("Connected to the mongoDB");
    return connection;
  } catch (error) {
    console.log("Error", error);
  }
};

export default connectDB;
