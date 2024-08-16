import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    // Filter messages for the selected user
    const filteredMessages = messages.filter(message => message.receiverId === selectedUser?._id);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                filteredMessages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            }
        </div>
    );
};

export default Messages;
