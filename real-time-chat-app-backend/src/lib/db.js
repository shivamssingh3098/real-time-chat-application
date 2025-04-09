import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connection of db is " + connection.connection.host);
  } catch (error) {
    console.log("Error while connecting to Mongo", error);
  }
};
export default connectDb;
