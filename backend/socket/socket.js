import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://mernchat-app-pr7h.onrender.com'],
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {}; // {userId -> socketId}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    // Map the user's ID to their socket ID
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Notify all clients about the updated list of online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Handle message sending
    socket.on('sendMessage', ({ receiverId, message }) => {
        const receiverSocketId = userSocketMap[receiverId];

        // Send the message only to the intended recipient
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receiveMessage', { message, senderId: userId });
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, io, server };
