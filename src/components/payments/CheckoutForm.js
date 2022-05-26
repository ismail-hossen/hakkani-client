import { CardElement } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-success btn-sm mt-4" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
