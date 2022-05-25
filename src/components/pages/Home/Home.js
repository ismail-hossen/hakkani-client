import React from "react";
import { useQuery } from "react-query";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";

const Home = () => {
  const {
    data: tools,
    loading
  } = useQuery("collection", () =>
    fetch("http://localhost:5000/tools-collection").then((res) => res.json())
  );

  
  if(loading){
    return <h1>loading...</h1>
  }

  return (
    <>
      <Carousel></Carousel>
      <div className="w-5/6 mx-auto">
        <div className="lg:flex my-16 lg:my-32 lg:gap-6">
          {
            tools?.map(tool => <Service key={tool._id} tools={tool}/>)
          }
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
