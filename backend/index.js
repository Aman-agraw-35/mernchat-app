import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./api/config/database.js";
import userRoute from "./api/routes/userRoute.js";
import messageRoute from "./api/routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./api/socket/socket.js";

dotenv.config({});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://mernchat-app-beryl.vercel.app',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
