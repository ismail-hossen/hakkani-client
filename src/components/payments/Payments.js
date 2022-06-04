import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useJwtVerify from "../hooks/useJwtVerify";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51IhDlMHEs92aEw5xvqGOPKSB2lSliO2Jcubx10tBweogfBiNSh0eG5K4mvnUbFWwP20b439IdXEBozoHpCVR9uPS00RCh6tZfS"
);

const Payments = () => {
  const { id } = useParams();
  const fetching = async () => {
    const { data } = await useJwtVerify.get(
      `https://pure-refuge-14003.herokuapp.com/find-one-order/${id}`
    );
    return data[0];
  };
  const { data: orders, loading } = useQuery("OCollection", fetching);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="card w-3/6 mx-auto lg:card-side bg-base-100 shadow-xl">
      <div>
        <p>Please pay: ${orders?.price}</p>
      </div>
      <div className="card-body w-50">
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
