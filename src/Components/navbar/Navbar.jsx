import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import { useNavigate } from 'react-router-dom'
import Aos from 'aos';
import 'aos/dist/aos.css'



import logo from '../../assets/logo.png';

const Menu = () => {
  
  return (
    <>
    
      <p><a href="#home">Home</a></p>
      <p><a href="#whtgpt3">What is GPT?</a></p>
      <p><a href="#possibility">Open AI</a></p>
      <p><a href="#features">Case Studies</a></p>
      <p><a href="#blog">Library</a></p>
    </>
  );
};

export default function Navbar() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  

  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate =useNavigate()
  return (
      <div className="gpt3__navbar"data-aos="fade-down">
        <div className="gpt3__Navbar-links">
          <div className="gpt3__navbar-links__logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="gpt3__navbar-links_container">
            <Menu />
          </div>
        </div>
        {/* hello */}
        <div className="gpt3__navbar-sign">
          <p onClick={()=>navigate("/login")}>Sign in</p>
          <button type='button'onClick={()=>navigate("/signup")}>Sign up</button>
        </div> 
        <div className="gpt3__navbar-menu">
          {toggleMenu ?
            <RiCloseLine color="#fff" size="27" onClick={() => setToggleMenu(false)} /> :
            <RiMenu3Line color="#fff" size="27" onClick={() => setToggleMenu(true)} />
          }
          {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
              <div className="gpt__navar-menu_container-links">
                <Menu />
                <div className="gpt3__navbar-menu_container-links-sign">
                  <p >Sign in</p>
                  <button type='button'>Sign up</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
