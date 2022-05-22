import React from "react";
import BSummary from "./BSummary";
import Carousel from "./Carousel";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <div className="lg:h-72 flex items-center justify-center">
        <BSummary></BSummary>
      </div>
    </div>
  );
};

export default Home;
