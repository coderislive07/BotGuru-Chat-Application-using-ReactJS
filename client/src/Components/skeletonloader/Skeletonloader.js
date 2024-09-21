// SkeletonLoader.js
import React from 'react';
import '../skeletonloader/Skeletonloader.css'; 

const SkeletonLoader = () => {
  return (
    <div className="container">
      <div className="loader">
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
        <div className="crystal"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
