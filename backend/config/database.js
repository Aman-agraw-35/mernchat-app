import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
    console.log('MongoDB URI:', process.env.MONGO_URI); 
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Database connection error:', error);
    });
};

export default connectDB;
