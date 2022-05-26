import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useJwtVerify from "../hooks/useJwtVerify";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  `process.env.publishable_key`
);

const Payments = () => {
  const { id } = useParams();
  const fetching = async () => {
    const { data } = await useJwtVerify.get(
      `http://localhost:5000/find-one-order/${id}`
    );
    return data[0];
  };
  const { data: orders, loading, refetch } = useQuery("OCollection", fetching);

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
          <CheckoutForm order={orders}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
