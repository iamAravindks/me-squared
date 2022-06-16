import mongoose from "mongoose";
import config from "../config.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      config.MONGODB_LOCALHOST_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB connected  `);
  } catch (error) {
    console.log();
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
