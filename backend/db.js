import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // these options are no longer needed in Mongoose 6+, 
      // but you can leave them out safely
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectDB;
