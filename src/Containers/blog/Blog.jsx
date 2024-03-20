import React, { useEffect } from 'react';
import Article from '../../Components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './import';
import './blog.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Blog() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="gpt3__blog section__padding" id="blog"data-aos="fade-up">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">A lot is happening, <br /> We are blogging about it.</h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          <Article imgUrl={blog01} date="Sep 26, 2021" text="GPT-5  and Open  AI is the future." />
        </div>
        <div className="gpt3__blog-container_groupB">
          <Article imgUrl={blog02} date="Sep 26, 2021" text="GPT-5 and Open  AI is the future." link="https://plainenglish.io/blog/the-future-of-ai-chat-gpt-5" />
          <Article imgUrl={blog03} date="Sep 26, 2021" text="GPT-5: Everything You Need to Know So Far" link="https://www.youtube.com/watch?v=Zc03IYnnuIA" />
          <Article imgUrl={blog04} date="Sep 26, 2021" text="ChatGPT 5 is Here! Everything You Need to Know" link="https://www.youtube.com/watch?v=j5erLk4q-Yw" />
          <Article imgUrl={blog05} date="Sep 26, 2021" text="ChatGPT 5: Here's What We Know So Far" link="https://www.youtube.com/watch?v=Glg7A3ZKGl4&t=8s" />
        </div>
      </div>
    </div>
  );
}
