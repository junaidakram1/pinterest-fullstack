import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is running!");
  } catch (err) {
    console.log("DB Connection Error", err);
  }
};

export default connectDB;
