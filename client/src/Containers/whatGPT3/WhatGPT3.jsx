import React, { useEffect } from 'react';
import './whatGPT3.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Feature from '../../Components/feature/Feature';

export default function WhatGPT3() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className='gpt3__whatgpt3 section__margin' data-aos="fade-right" id="whtgpt3">
      <div className="gpt3__whatgpt3-feature">
        <Feature
          title="What is BotGuru?"
          text="BotGuru is an advanced AI-powered assistant designed to provide seamless interaction across various domains, from customer support to creative content generation. Leveraging state-of-the-art language models, BotGuru is built to understand and respond to users with exceptional accuracy and depth. Its mission is to democratize AI knowledge, providing users with powerful, intuitive tools that help them achieve more."
        />
      </div>

      <div className="gpt3__whatgpt3-heading">
        <h1 className='gradient__text'>
          The possibilities are beyond your imagination with BotGuru
        </h1>
        <a href="#blog"><p>Explore the Knowledgebase</p></a>
      </div>

      <div className="gpt3__whatgpt3-container">
        <Feature
          title="Intelligent Chatbots"
          text="BotGuru excels in creating highly intelligent and customizable chatbots for any business need. Whether it's for customer support, personal assistants, or creative collaboration, BotGuru's adaptability ensures smooth and efficient communication. Its learning abilities allow it to be fine-tuned to specific business requirements, ensuring high relevance and accuracy in responses."
        />

        <Feature
          title="Comprehensive Knowledgebase"
          text="At the core of BotGuru's capabilities lies its vast and ever-expanding knowledgebase. Trained on diverse datasets, BotGuru provides fact-based, context-aware answers that enrich user interactions. From technical queries to creative brainstorming, BotGuru’s knowledgebase is designed to support users in a wide range of tasks."
        />

        <Feature
          title="Ethics and Safety at the Forefront"
          text="BotGuru is built with strong ethical guidelines, ensuring safe and responsible AI use. It prioritizes user privacy, data security, and fairness in decision-making. BotGuru actively monitors conversations to avoid harmful content and biases, making it a trustworthy tool for users across all industries."
        />
      </div>
    </div>
  );
}
