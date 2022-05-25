import React from "react";

const OrderRow = ({ order, index }) => {
  const deleteUser = (id) => {
    console.log(id);
    const confirmDelete = window.confirm("Are you sure for cancel an order?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/order-collection/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{order.userName}</td>
      <td>{order.order}</td>
      <td>{order.email}</td>
      <td>
        <button
          onClick={() => deleteUser(order._id)}
          className="btn btn-circle btn-outline"
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
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
