import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect to mongodb");
  } catch (error) {
    console.log('error connect to database: ',error);
  }
};

export default connectMongoDB;
