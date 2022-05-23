import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import OrderRow from "./OrderRow";

const MyOrders = () => {
  const [myOrderList, setMyOrderList] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/order-collection/${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyOrderList(data));
  }, [user]);
  if (loading) {
    return <h1>loading...</h1>;
  }
  console.log(myOrderList);

  return (
    <div className="overflow-x-auto w-5/6 mx-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Order</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {myOrderList.map((order, index) => (
            <OrderRow key={order._id} index={index} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
