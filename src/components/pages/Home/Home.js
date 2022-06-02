import React from "react";
import { useQuery } from "react-query";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";

const Home = () => {
  const { data: tools, loading } = useQuery("TCollection", () =>
    fetch("http://localhost:5000/tools-collection").then((res) => res.json())
  );
  const { data: reviews, loading2 } = useQuery("RCollection", () =>
    fetch("http://localhost:5000/review").then((res) => res.json())
  );
  if (loading || loading2) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <Carousel></Carousel>
      <div className="w-5/6 mx-auto">
        <div className="grid grid-cols-3 my-16 lg:my-32 lg:gap-5">
          {tools?.map((tool) => (
            <Service key={tool._id} tools={tool} />
          ))}
        </div>
        <div className="my-32 flex items-center justify-center">
          <BSummary></BSummary>
        </div>
        <div className="lg:grid grid-cols-5 lg:gap-5 lg:my-32">
          {reviews?.map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
