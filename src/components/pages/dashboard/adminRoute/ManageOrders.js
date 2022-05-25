import React from "react";
import { useQuery } from "react-query";
import OrderRow from "../userRoute/OrderRow";

const ManageOrders = () => {
  const { data: allOrders, loading } = useQuery("OCollection", () =>
    fetch("http://localhost:5000/users").then((res) => res.json())
  );
  if (loading) {
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
            <th>X</th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.order.map((order, index) => (
            <OrderRow key={order._id} index={index} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
