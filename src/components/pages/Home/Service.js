import React from "react";

const Service = ({ lg, text, btn }) => {
  return (
    <div className={`card ${lg}card-side bg-base-100 shadow-xl`}>
      <figure>
        <img
          src="https://api.lorem.space/image/movie?w=200&h=280"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Tools Name: dodo</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
          facere.
        </p>
        <h2>Available Quantity: 750</h2>
        <h2>{text}</h2>
        <h2>Price: $100</h2>
        <div className="card-actions justify-end">
          {btn}
        </div>
      </div>
    </div>
  );
};

export default Service;
