import mongoose from "mongoose";

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Database connected');
    }).catch((error)=>{
        console.log(error);
    })
};
export default connectDB;