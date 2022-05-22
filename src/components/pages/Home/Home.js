import React from "react";
import { useNavigate } from "react-router-dom";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";

const Home = () => {
  const navigate = useNavigate();
  const btn = <button onClick={() => navigate("/place-order/:id")} className="btn btn-primary">Place Order</button>;
  return (
    <div>
      <Carousel></Carousel>
      <div className="flex w-5/6 mx-auto gap-4">
        <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
        <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
        <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
      </div>
      <div className="lg:h-72 flex items-center justify-center">
        <BSummary></BSummary>
      </div>
      <div className="lg:flex w-5/6 mx-auto gap-4">
        <Review></Review>
        <Review></Review>
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
