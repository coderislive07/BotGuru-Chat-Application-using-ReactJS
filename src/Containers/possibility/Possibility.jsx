import React, { useEffect } from 'react'
import './possibility.css'
import possibilityImage from "../../assets/possibility.png"
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function Possibility() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  return (
    <div className='gpt3__possibility section__padding'id="possibility"data-aos="flip-right">
      <div className="gpt3__possibility-image">
        <img src={possibilityImage} alt="possibility"/>
      </div>
      <div className="gpt3__possibility-content">
        <h4>Make everything possible with Chat-GPT5</h4>
        <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
        <p>Indeed, the possibilities with ChatGPT-5 extend far beyond the confines of imagination. With its unparalleled capacity for learning and adaptation, it transcends the boundaries of what we perceive as possible, venturing into realms of innovation and discovery previously thought unattainable. From unraveling the mysteries of the universe to redefining the landscapes of creativity, ChatGPT-5 serves as a conduit to the infinite realms of knowledge and possibility</p>
      </div>
      
    </div>
  )
}