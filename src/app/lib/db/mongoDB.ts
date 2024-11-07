import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGO_URI || "";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Nomgodb connection successfull !!!");
  } catch (error) {
    throw new Error("Error in connecting to mongoDB " + error);
  }
};

export default connect;
