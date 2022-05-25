import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../../../firebase.config";
import OrderRow from "./OrderRow";

const MyOrders = () => {
  const [user, userLoading] = useAuthState(auth);

  const {
    data: orders,
    loading,
    refetch,
  } = useQuery(["OCollection", user.email], () =>
    fetch(`http://localhost:5000/order-collection/${user.email}`).then((res) =>
      res.json()
    )
  );

  const deleteAllOrder = (email) => {
    fetch(`http://localhost:5000/delete-order?email=${email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };
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
            <th>
              <button
                onClick={() => deleteAllOrder(user?.email)}
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
          {orders?.map((order, index) => (
            <OrderRow key={order._id} index={index} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
