import { Message } from "../models/messageModel.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.id;

        // Find the message by its ID
        const message = await Message.findById(messageId);

        // Ensure the message exists and the user is either the sender or receiver
        if (!message || (message.senderId.toString() !== userId && message.receiverId.toString() !== userId)) {
            return res.status(404).json({ success: false, message: "Message not found or access denied." });
        }

        // Add user to deletedFor array
        if (!message.deletedFor.includes(userId)) {
            message.deletedFor.push(userId);
            await message.save();
        }

        return res.status(200).json({ success: true, message: "Message deleted for you." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to delete message." });
    }
};
