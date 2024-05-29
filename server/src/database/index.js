import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(`Can not connect to database, error: ${error.message}`);
  }
};

export default connectDatabase;
