import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ id }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch(`https://pure-refuge-14003.herokuapp.com/find-one-order/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrderData(data[0]));
  }, [id]);
  const price = orderData.price;

  useEffect(() => {
    fetch("https://pure-refuge-14003.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: orderData.userName,
            email: orderData.email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Congrats! Your payment is completed.");

      //store payment on database
      const payment = {
        orderId: orderData?._id,
        transactionId: paymentIntent.id,
      };
      fetch(`https://pure-refuge-14003.herokuapp.com/payment/${orderData?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
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
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success} </p>
          <p>
            Your transaction Id:{" "}
            <span className="text-orange-500 font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
