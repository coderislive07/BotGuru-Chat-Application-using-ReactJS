import React, { useEffect } from 'react';
import Lottie from 'lottie-react'; // Import Lottie component
import './header.css';
import people from '../../assets/people.png';
import ai from '../../assets/ai.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css'


export default function Header() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  return (
    <div className="gpt3__header section__padding" id="home"data-aos="fade-right">
      <div className="gpt3__header-content">
        <h1 className="gradient__text bouncing-animation">Let's Build Something amazing with GPT-5 OpenAI</h1>
        <p>ChatGPT 5 will be a state-of-the-art language model that makes it feel like you are communicating with a person rather than a machine. With its ability to understand intent and fulfill user’s needs, ChatGPT is already making waves in the technology industry. </p>
        <div className="gpt3__header-content__input">
          <input type='email' placeholder='Your Email Address'></input>
          <button type='button'>Get Started</button>
        </div>
        <div className='gpt3__header-content__people'>
          <img src={people} alt="people"/>
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>
      <div className="gpt3__header-image">
        {/* Replace dotlottie-player with Lottie component */}
        <Lottie
          path="https://lottie.host/722ddd0e-462c-46f4-bdd6-07a1530fab6d/d6CEWHskKa.json"
          background="transparent"
          speed={1}
          loop
          autoplay
          style={{ width: '600px', height: '600px'}}
        />
      </div>
    </div>
  );
}
