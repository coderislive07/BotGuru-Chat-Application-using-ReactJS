import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatHistory.css';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default function ChatHistory({ onSelectChat }) {
  const [chatHistories, setChatHistories] = useState([]);

  useEffect(() => {
    const fetchChatHistories = async () => {
      try {
        const response = await axiosInstance.post('/api/get-chat-history');
        const filteredChats = filterChatsWithinLast24Hours(response.data.chatHistory);
        setChatHistories(filteredChats);
      } catch (error) {
        console.error('Error fetching chat histories:', error);
      }
    };

    fetchChatHistories();
  }, []);

  const filterChatsWithinLast24Hours = (histories) => {
    const now = Date.now();
    const last24Hours = 24 * 60 * 60 * 1000; 

    return histories.filter(({ timestamp }) => {
      const chatTime = new Date(timestamp).getTime();
      return now - chatTime <= last24Hours;
    });
  };

  return (
    <div className="chat-history-sidebar">
      <h5>Today</h5>
      <ul>
        {chatHistories.map((chat, index) => (
          <li key={index} onClick={() => onSelectChat(chat.timestamp)}>
           { `${chat.message.slice(0, 30)}...` }
          </li>
        ))}
      </ul>
    </div>
  );
}
