import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://konhito02:VCwUqOUQ9gFtxXiH@cluster0.oqaxs.mongodb.net/Leetcode?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connect to mongoose");
  } catch (error) {
    console.log("Error connecting to mongoose", error.message);
  }
};
