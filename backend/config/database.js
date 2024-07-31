import mongoose from 'mongoose';


 const connectDb = async () => {
await mongoose.connect(process.env.MONGO_URI)
.then(()=> {
console.log("database connection established");
})
.catch(err => console.log("database connection error"))
}

export default connectDb ;