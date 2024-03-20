import React, { useEffect } from 'react'
import './whatGPT3.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
import Feature from '../../Components/feature/Feature'
export default function WhatGPT3() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  return (
    <div className='gpt3__whatgpt3 section__margin' data-aos="fade-right" id="whtgpt3">
      <div className="gpt3__whatgpt3-feature">
        <Feature title="What is GPT-5" text="GPT-5 is the follow-up to GPT-4, OpenAI’s fourth-generation chatbot that you have to pay a monthly fee to use.

GPT stands for generative pre-trained transformer, which is an AI engine built and refined by OpenAI to power the different versions of ChatGPT. Like the processor inside your computer, each new edition of the chatbot runs on a brand new GPT with more capabilities. "/>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className='gradient__text'>
          The possibilities are beyond your imagination
        </h1>
        <a href="#blog"><p>Explore the Library</p></a>
      </div>
      <div className="gpt3__whatgpt3-container">
        <Feature title="Chatbots" text="OpenAI recognized that not all chatbot use cases are the same. While ChatGPT-5’s base model is highly competent, it may not be optimized for specific applications, such as customer support, language translation, or content creation. To address this, OpenAI introduced fine-tuning capabilities.

Fine-tuning allows developers and organizations to customize ChatGPT-5’s behavior and responses to suit their specific requirements. This capability not only enhances the chatbot’s performance in targeted domains but also makes it more aligned with the values and goals of the organization deploying it."/>
        <Feature title="Knowledgebase" text="ChatGPT-5 builds upon the foundation of its predecessor, GPT-3, which was already an impressive language model. GPT-3 had the ability to generate human-like text based on the input it received, and it quickly gained popularity for its versatility and creativity. However, as with any technology, there was room for improvement.

OpenAI’s team of researchers and engineers took on the challenge of enhancing GPT-3’s conversational abilities. They wanted to create a chatbot that could engage in more coherent, contextually relevant, and human-like conversations. The result was ChatGPT-5, an AI model that sets new standards for natural language understanding and generation."/>
        <Feature title="Ethics and safety" text="As AI technologies advance, so do the concerns surrounding their ethical implications. OpenAI understands the importance of responsible AI development and has made substantial efforts to address ethical concerns with ChatGPT-5." />
      </div>


    </div>
  )
}