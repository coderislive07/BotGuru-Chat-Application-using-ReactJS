import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutModal from '../logoutModal/LogoutModal';
import logo from '../../assets/logo.svg';
import SkeletonLoader from '../../Components/skeletonloader/Skeletonloader';
import './chatbot.css';
import { useAppStore } from '../../store';
import Cookies from 'js-cookie';
import ChatHistory from '../chatHistory/ChatHistory';
import WelcomeMessage from '../welcomemessage/WelcomeMessage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewChat, setIsNewChat] = useState(true); 
  const navigate = useNavigate();
  const { userInfo, setUserInfo, messages, setMessages, clearMessages } = useAppStore();

  const initialLoad = useRef(true);
  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;

      const idToken = Cookies.get('idToken');
      const email = Cookies.get('email');
      const displayName = Cookies.get('displayName');
      const photoURL = Cookies.get('photoURL');
      const chatHistory = Cookies.get('chatHistory');

      if (idToken && email && displayName && photoURL) {
        if (!userInfo || !userInfo.email) {
          setUserInfo({ email, displayName, photoURL });
        }

        if (chatHistory) {
          const parsedChatHistory = JSON.parse(chatHistory);
          if (JSON.stringify(parsedChatHistory) !== JSON.stringify(messages)) {
            setMessages(parsedChatHistory);
          }
        }
      } else {
        navigate('/login');
      }
    }
  }, [userInfo, navigate, setUserInfo, setMessages, messages]);

  useEffect(() => {
    if (userInfo.email === null) {
      clearMessages();
    }
  }, [userInfo.email, clearMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsNewChat(false); // Hide welcome message once a question is asked

    const newMessages = [...messages, { message: input, sender: 'user' }];
    setMessages(newMessages);
    Cookies.set('chatHistory', JSON.stringify(newMessages));
    setLoadingIndex(newMessages.length - 1);

    try {
      const response = await axiosInstance.post('/api/chat', { message: input });
      const chatResponse = response.data.response;

      const updatedMessages = [
        ...newMessages,
        { message: chatResponse, sender: 'chatgpt' },
      ];

      setMessages(updatedMessages);
      Cookies.set('chatHistory', JSON.stringify(updatedMessages), { expires: 7 });

      await axiosInstance.post('/api/savechat', {
        userId: userInfo.email,
        message: input,
        sender: 'user',
      });

      await axiosInstance.post('/api/savechat', {
        userId: userInfo.email,
        message: chatResponse,
        sender: 'bot',
      });
    } catch (error) {
      console.error('Error fetching response from backend:', error);
    } finally {
      setLoadingIndex(null);
    }
    setInput('');
  };

  const handleSelectChat = (timestamp) => {
    console.log('Selected chat timestamp:', timestamp);
  };

  const handleNewChat = () => {
    setIsNewChat(true);  
    
   
    clearMessages();  
    setMessages([]);  
    Cookies.remove('chatHistory');  
  
    console.log('New chat started');
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();  
      event.preventDefault();  
    }
  }
  
  

  return (
    <div className='chatbot'>
      <aside className='sideMenu'>
        <div className='menutop'>
          <h1 className='brandname'>BotGuru</h1>
          <svg className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd"/>
          </svg>
        </div>
        <div onClick={handleNewChat} className="side-menu-button">
          <span onClick={handleNewChat}>+</span>
          <h4 onClick={handleNewChat}>New Chat</h4>
        </div>
        <ChatHistory onSelectChat={handleSelectChat} />
      </aside>
      <section className='chatbox'>
        <div className='userinfo' onClick={() => setIsModalOpen(true)}>
          <img src={userInfo.photoURL} alt="Profile" />
        </div>
        <div className='chat-log'>
          {messages.length==0  ? (
            <WelcomeMessage />
          ) : (
            messages.map((msg, index) => (
              <React.Fragment key={index}>
                <div className={`chat-message ${msg.sender === 'chatgpt' ? 'chatgpt' : ''}`}>
                  <div className="chat-message-center">
                    <div className={`avatar ${msg.sender === 'chatgpt' ? 'chatgpt' : ''}`}>
                      {msg.sender === 'user' ? (
                        <img src={userInfo.photoURL} alt="User Avatar" className="avatar-img" />
                      ) : (
                        <img src={logo} alt="ChatGPT Avatar" className="avatar-img" />
                      )}
                    </div>
                    <div className='message'>{msg.message}</div>
                  </div>
                </div>
                <div className='loader'>
                  {index === loadingIndex && (
                    <SkeletonLoader className='loader' />
                  )}
                </div>
              </React.Fragment>
            ))
          )}
        </div>
        <div className='chat-input-holder'>
          <input type='text'
            className="chat-input-textarea"
            placeholder='Enter a prompt here...'
            onKeyUp={handleKeyPress}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="button">
            <div className="button-box">
              <span className="button-elem">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19V5m0 14-4-4m4 4 4-4"/>
                </svg>
              </span>
            </div>
          </button>
        </div>
      </section>
      <LogoutModal
        className='logout'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogout={clearMessages}
      />
    </div>
  );
}
