import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import notificationSound from "../assets/sounds/notifications.mp3";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user); 
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();

            if (newMessage.senderId === selectedUser?._id || newMessage.receiverId === selectedUser?._id) {
   
                dispatch(setMessages([...messages, newMessage]));
            }
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, selectedUser, messages, dispatch]);

};

export default useGetRealTimeMessage;
