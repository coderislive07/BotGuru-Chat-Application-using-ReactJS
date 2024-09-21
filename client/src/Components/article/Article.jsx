import React from 'react';
import './article.css';
import { Link } from 'react-router-dom';

const Article = ({ imgUrl, date, text,link }) => (
  <div className="gpt3__blog-container_article">
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <Link to ={link}><p>Read Full Article</p></Link>
    </div>
  </div>
);

export default Article;