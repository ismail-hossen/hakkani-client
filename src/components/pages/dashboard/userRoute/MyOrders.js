import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../../../firebase.config";
import useJwtVerify from "../../../hooks/useJwtVerify";
import OrderRow from "./OrderRow";

const MyOrders = () => {
  const [user, userLoading] = useAuthState(auth);

  const fetchData = async () => {
    const { data } = await useJwtVerify.get(
      `http://localhost:5000/order-collection/${user?.email}`
    );
    return data;
  };
  const { data: orders, loading, refetch } = useQuery("OCollection", fetchData);

  const deleteAllOrder = () => {
    fetch(`http://localhost:5000/delete-order?email=${user?.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  refetch();
  if (loading || userLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="overflow-x-auto w-5/6 mx-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Order</th>
            <th>Email</th>
            <th>Transaction ID</th>
            <th>Payment</th>
            <th>
              <button
                onClick={deleteAllOrder}
                className="btn btn-square btn-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=""
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order, index) => (
              <OrderRow key={order._id} index={index} order={order} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
