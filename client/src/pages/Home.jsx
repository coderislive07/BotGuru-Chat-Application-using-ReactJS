import React, { useEffect, useState } from 'react';
import Preloader from '../Components/preloaders/dog';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from "../Components";
import './home.css'
import { Features, Footer, Header, Possibility, WhatGPT3, Blog } from "../Containers";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
        <WhatGPT3 />
        <Features />
        <Possibility />
        <Blog />
        <Footer />
      </div>
    </div>
  );
}
