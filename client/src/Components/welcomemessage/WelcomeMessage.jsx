import React from 'react';
import './WelcomeMessage.css'; 
import logo from '../../assets/logo.svg'

const WelcomeMessage = () => (
  <div className='welcome-message'>
  <img src={logo}></img>
    <h2>Welcome to BotGuru!</h2>
    <p>Start a conversation by typing your message below.</p>
  </div>
);

export default WelcomeMessage;