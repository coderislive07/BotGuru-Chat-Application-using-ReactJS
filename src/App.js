import React from 'react';
import './App.css';


import { useNavigate } from 'react-router-dom';
import { Article, Brand, CTA, Feature, Navbar, Login, Signup } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Features, Footer, Header, Possibility, WhatGPT3, Blog } from "./Containers";
import Chatbot from './Components/chatbot/Chatbot';



const Layout = ({ children }) => {
  return (
    <>
      <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
          <Brand />
          <WhatGPT3 />
          <Features />
          <Possibility />
          <CTA />
          <Blog />
          <Footer />
          <chatbot/>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Layout />} /> 
        <Route path="/chatbot" element={<Chatbot />} /> 
      </Routes>
    </Router>
    </>
  );
}
