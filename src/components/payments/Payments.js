import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IhDlMHEs92aEw5xvqGOPKSB2lSliO2Jcubx10tBweogfBiNSh0eG5K4mvnUbFWwP20b439IdXEBozoHpCVR9uPS00RCh6tZfS"
);

const Payments = () => {
  return (
    <div className="card w-3/6 mx-auto lg:card-side bg-base-100 shadow-xl">
      <figure className="w/50">
        <img
          src="https://api.lorem.space/image/album?w=400&h=400"
          alt="Album"
        />
      </figure>
      <div className="card-body w-50">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
