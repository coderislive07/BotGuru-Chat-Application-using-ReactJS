import React, { useEffect } from 'react';
import './features.css';
import { Feature } from '../../Components';
import Aos from 'aos';
import 'aos/dist/aos.css'

const featuresData = [
  {
    title: 'Enhanced User Interaction',
    text: 'BotGuru provides a refined interaction experience with the ability to ask clarifying questions and adapt responses in real-time. This reduces ambiguity, ensuring users get precise and relevant answers, tailored to their needs.'
  },
  {
    title: 'Context-Aware Conversations',
    text: 'BotGuru is equipped with advanced memory capabilities, allowing it to remember past interactions within the same session. This enables a richer, contextually aware conversation flow, making interactions feel more human-like and continuous over time.'
  },
  {
    title: 'Multi-Modal Intelligence',
    text: 'BotGuru goes beyond text-based interactions, incorporating multi-modal capabilities. Whether interpreting visual data, processing audio inputs, or generating complex outputs, BotGuru aims to deliver a complete AI experience for more diverse applications.'
  },
  {
    title: 'Data Privacy & Security',
    text: 'BotGuru ensures top-notch privacy and security protocols. User data is encrypted and stored securely, with anonymization processes in place. BotGuru follows stringent guidelines to protect user interactions, ensuring confidentiality and responsible data handling.'
  }
];

export default function Features() {
  useEffect(()=>
  {
    Aos.init({ duration: 2000 });
  },[]);

  return (
    <div className='gpt3__features section__padding' id="features" data-aos="flip-right">
      <div className='gpt3__features-heading'>
        <h1 className='gradient__text'>The Future is Here with BotGuru. Step into Tomorrow’s AI Today.</h1>
      </div>
      <div className="gpt3__features-container">
        {featuresData.map((item, index) => (
          <div key={index} className="feature-item">
            <Feature title={item.title} text={item.text} />
          </div>
        ))}
      </div>
    </div>
  );
}
