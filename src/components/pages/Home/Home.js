import React from "react";
import { useQuery } from "react-query";
import BSummary from "./BSummary";
import Carousel from "./Carousel";
import Review from "./Review";
import Service from "./Service";
import Slider from "./Slider";

const Home = () => {
  const { data: tools, loading } = useQuery("TCollection", () =>
    fetch("https://pure-refuge-14003.herokuapp.com/tools-collection").then(
      (res) => res.json()
    )
  );
  const { data: reviews, loading2 } = useQuery("RCollection", () =>
    fetch("https://pure-refuge-14003.herokuapp.com/review").then((res) =>
      res.json()
    )
  );
  const sliceReview = reviews?.slice(-6);
  if (loading || loading2) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      <Carousel></Carousel>
      <div className="w-5/6 mx-auto">
        <div className="lg:grid grid-cols-3 my-16 lg:my-32 lg:gap-5">
          {tools?.map((tool) => (
            <Service key={tool._id} tools={tool} />
          ))}
        </div>
        <div className="my-32 flex flex-col items-center justify-center">
          <h1 className="mb-10 text-center text-xl">Business summary</h1>
          <BSummary></BSummary>
        </div>
        <div>
          <h1 className="text-center text-xl">Our customers reviews</h1>
          <div className="my-12">
            <Slider>
              {sliceReview?.map((review) => (
                <Review key={review._id} review={review} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
