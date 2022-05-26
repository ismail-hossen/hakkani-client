import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IhDlMHEs92aEw5xvqGOPKSB2lSliO2Jcubx10tBweogfBiNSh0eG5K4mvnUbFWwP20b439IdXEBozoHpCVR9uPS00RCh6tZfS"
);

const Payments = () => {
  return (
    <div className="card w-4/5 mx-auto lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://api.lorem.space/image/album?w=400&h=400"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <Elements stripe={stripePromise}><CheckoutForm></CheckoutForm></Elements>
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
