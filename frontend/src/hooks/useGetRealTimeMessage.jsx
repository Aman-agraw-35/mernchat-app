import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { selectedUser, messages } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            // Ensure the message is only added to the currently selected user's messages
            if (newMessage.receiverId === selectedUser?._id) {
                dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));
            }
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, dispatch, selectedUser]);

    // This hook does not return anything; it just manages real-time message updates
};

export default useGetRealTimeMessage;
