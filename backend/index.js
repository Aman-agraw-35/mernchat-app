import express from "express";
import dotenv from "dotenv";
 import  connectDB  from "./config/database.js";
dotenv.config({});

const app = express();


const PORT =   8080 ;

app.listen(PORT, () => {
     connectDB();
    console.log(`Server listening on port ${PORT}`)
})