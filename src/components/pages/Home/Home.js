import React from "react";
import { useNavigate } from "react-router-dom";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";

const Home = () => {
  const navigate = useNavigate();
  const btn = (
    <button
      onClick={() => navigate("/place-order/:id")}
      className="btn btn-primary"
    >
      Place Order
    </button>
  );
  return (
    <>
      <Carousel></Carousel>
      <div className="w-5/6 mx-auto">
        <div className="lg:flex my-16 lg:my-32 lg:gap-6">
          <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
          <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
          <Service lg="lg:" text="Minimum Order: 100" btn={btn}></Service>
        </div>
        <div className="my-32 flex items-center justify-center">
          <BSummary></BSummary>
        </div>
        <div className="flex gap-5 my-32">
          <Review></Review>
          <Review></Review>
          <Review></Review>
          <Review></Review>
        </div>
      </div>
    </>
  );
};

export default Home;
