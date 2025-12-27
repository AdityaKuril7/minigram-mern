import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}${DB_NAME}`
    );
    console.log("Host :- ", connectionInstance.connection.host);
  } catch (error) {
    console.log({ success: false, ErrorMessage: error });
  }
};

export { connectDb };
