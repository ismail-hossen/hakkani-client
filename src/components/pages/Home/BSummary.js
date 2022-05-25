import React from 'react';

const BSummary = () => {
    return (
      <div className="stats lg:h-60 w-5/6 stats-vertical lg:stats-horizontal shadow">
  
      <div className="stat place-items-center">
        <div className="stat-title">Customers</div>
        <div className="stat-value">100+</div>
        <div className="stat-desc">we served 100+ customers</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Tools</div>
        <div className="stat-value">50+</div>
        <div className="stat-desc">our company's have in 50+ tools</div>
      </div>
      
      <div className="stat place-items-center">
        <div className="stat-title">Reviews</div>
        <div className="stat-value">75+</div>
        <div className="stat-desc">customers review</div>
      </div>
      
    </div>
    );
};

export default BSummary;