import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    const formatTimestampToIST = (timestamp) => {
        const date = new Date(timestamp);
        const istOffset = 5.5 * 60 * 60 * 1000; 
        const istDate = new Date(date.getTime() + istOffset);
        
        const formattedDate = istDate.toISOString().substring(0, 10);
        const formattedTime = istDate.toISOString().substring(11, 19);
        
        return `${formattedDate} ${formattedTime}`;
    }

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formatTimestampToIST(message?.updatedAt)}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>{message?.message}</div>
        </div>
    )
}

export default Message;
