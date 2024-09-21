import React, { useEffect } from 'react';
import gpt3Logo from '../../assets/logo.svg';
import './footer.css';
import robothandshake from '../../assets/robothandshake.png'
import Aos from 'aos';
import 'aos/dist/aos.css'

const Footer = () => (
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[]),
  <div className="gpt3__footer section__padding"data-aos="fade-down">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </div>

    <div className="gpt3__footer-img">
      <img src={robothandshake} alt="robot"/>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>@2024 BotGuru <br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Get in touch</h4>
        <p>Crechterwoord K12 182 DK Alknjkcb</p>
        <p>085-132567</p>
        <p>info@payme.net</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2024 BotGuru. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;