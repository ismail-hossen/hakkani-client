import React from "react";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <div className="flex w-5/6 mx-auto">
      <Service></Service>
      <Service></Service>
      <Service></Service>
      </div>
      <div className="lg:h-72 flex items-center justify-center">
        <BSummary></BSummary>
      </div>
      <div className="lg:flex w-5/6 mx-auto">
      <Review></Review>
      <Review></Review>
      <Review></Review>
      </div>
    </div>
  );
};

export default Home;
