import React from "react";
import StarRatings from "react-star-ratings";

const Review = ({ review }) => {
  const { feedback, rating } = review;
  return (
    <div className="card mb-5 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://api.lorem.space/image/face?hash=92310" alt="" />
          </div>
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>
        <p>{feedback && feedback}</p>
        <div className="flex">
          <StarRatings
            rating={parseInt(rating)}
            starRatedColor="#FB923C"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="4px"
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
