import React from "react";

const Service = () => {
  return (
    <div class="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://api.lorem.space/image/movie?w=200&h=280"
          alt="Movie"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Service Name: dodo</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
          facere.
        </p>
        <h2>Available Quantity: 20</h2>
        <h2>Minimum Order: 5</h2>
        <h2>Price: $100</h2>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Service;
