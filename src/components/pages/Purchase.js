import React from "react";
import { useNavigate } from "react-router-dom";
import Service from "./Home/Service";

const Purchase = () => {
  const navigate = useNavigate();
  const btn = (
    <button onClick={() => navigate("")} className="btn btn-primary">
      Purchase
    </button>
  );
  return (
    <div className="w-5/6 mx-auto my-10">
      <div>
        <h2>Name:</h2>
        <h2>Email:</h2>
      </div>
      <Service
        btn={btn}
        text={["Minimum Order: ", <input type="number" value="100" />]}
      ></Service>
    </div>
  );
};

export default Purchase;
