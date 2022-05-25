import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ tools }) => {
  const navigate = useNavigate();
  const {
    toolsImage,
    toolsName,
    toolsPrice,
    available,
    toolsDec,
    _id,
    minOrder,
  } = tools;
  return (
    <div className="mb-5 card bg-base-100 shadow-xl">
      <figure>
        <img src={toolsImage} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Tools Name: {toolsName}</h2>
        <p>{toolsDec}</p>
        <h2>Available Quantity: {available}</h2>
        <h2>Minimum Order: {minOrder}</h2>
        <h2>Price: ${toolsPrice}</h2>
        <div className="card-actions justify-end">
          <button
            onClick={() => navigate(`/place-order/${_id}`)}
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
