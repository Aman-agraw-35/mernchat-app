import express from "express";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path" ;
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'https://mernchat-app-backend.vercel.app',
    credentials:true
};
app.use(cors(corsOption)); 
	
// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req,res)=>{
     res.sendFile(path.join(__dirname,"../frontend/build/index.html"));
})

server.listen(8080, ()=>{
    connectDB();
    console.log(`Server listen at port 8000`);
});