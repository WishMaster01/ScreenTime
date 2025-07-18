import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongo DB for ScreenTime is Connected Successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/screentime`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
