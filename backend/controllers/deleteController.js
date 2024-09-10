import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.id;

        console.log(messageId);
        console.log(userId);

        // Find the message by its ID
        const message = await Message.findById(messageId);

        // Ensure the message exists and the user is either the sender or receiver
        if (!message || (message.senderId.toString() !== userId && message.receiverId.toString() !== userId)) {
            return res.status(404).json({ success: false, message: "Message not found or access denied." });
        }

        // Mark the message as deleted
        message.deleted = true;
        await message.save();

        // // Notify the receiver and sender via socket
        // const receiverSocketId = getReceiverSocketId(message.receiverId);
        // const senderSocketId = getReceiverSocketId(message.senderId);

        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("messageDeleted", { messageId });
        // }

        // if (senderSocketId) {
        //     io.to(senderSocketId).emit("messageDeleted", { messageId });
        // }

        // Now remove the message from the database

        return res.status(200).json({ success: true, message: "Message deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to delete message." });
    }
};
