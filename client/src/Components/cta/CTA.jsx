import React, { useEffect } from 'react';
import './cta.css';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'

const CTA = () => {
  const navigate = useNavigate();
  useEffect(()=>
  {
    Aos.init({duration:2000})
  },[])
  return (
    <>
      <div className="gpt3__cta" data-aos="zoom-in">
        <div className="gpt3__cta-content">
          <h3>Sign-in & start exploring the endless possibilities.</h3>
        </div>
        <div className="gpt3__cta-btn">
          <button type='button' onClick={() => navigate("/Login")}>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default CTA;
