import React from "react";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate = useNavigate()
  return (
    <div className="card card-side bg-base-100 shadow-xl">
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
        <h2>Available Quantity: 20</h2>
        <h2>Minimum Order: 5</h2>
        <h2>Price: $100</h2>
        <div className="card-actions justify-end">
          <button onClick={() => navigate('/place-order/:id')} className="btn btn-primary">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Service;
