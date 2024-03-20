import React, { useEffect } from 'react';
import './features.css';
import { Feature } from '../../Components';
import Aos from 'aos';
import 'aos/dist/aos.css'

const featuresData = [
  {
    title: 'Better user experience',    
    text:'ChatGPT-5 is now better at asking clarifying questions when faced with ambiguous inputs. This helps reduce misunderstandings and ensures that users receive more accurate and relevant responses.'
  },
  {
    title: 'Remembering Like Humans Do',
    text: 'With improved memory, ChatGPT-5 can now remember past interactions within a conversation, enabling it to provide contextually rich responses. This makes the chatbot’s interactions more engaging and meaningful, as it can maintain continuity and reference prior information effectively.',
  },
  {
    title: 'Looking Ahead: Multi-modal Intelligence',
    text: 'Integrating multi-modal capabilities into ChatGPT-5 will unlock new possibilities for applications, from analyzing visual content to providing voice-driven interactions. The goal is to create a more holistic and comprehensive AI system that can bridge the gap between human and machine understanding'
  },
  {
    title: 'Privacy and Security',
    text: 'Privacy and security have been key considerations in the development of ChatGPT-5. OpenAI is committed to safeguarding user data and ensuring that user interactions with the chatbot remain confidential.Stringent encryption measures are in place to protect data, and OpenAI adheres to strict policies on data usage and storage. Additionally, user data is anonymized and used responsibly to ensure that individual identities are not compromised.'
  }
];

export default function Features() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  return (
    <div className='gpt3__features section__padding' id="features" data-aos="flip-right">
      <div className='gpt3__features-heading'>
        <h1 className='gradient__text'>The Future is Now and You Just Need To Realize It. Step into Future Today & Make it Happen.</h1>
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
