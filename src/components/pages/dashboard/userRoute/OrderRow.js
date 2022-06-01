import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const OrderRow = ({ order, index }) => {
  const navigate = useNavigate();
  const deleteOrder = (id) => {
    fetch(`http://localhost:5000/order-collection/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("successfully deleted");
        }
      });
  };
  const goForPayment = (id) => navigate(`/payment/${id}`);

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{order.userName}</td>
        <td>{order.order}</td>
        <td>{order.email}</td>
        <td>{order?.paid === true && <small>{order.transactionId}</small>}</td>
        <td>
          {order?.paid ? (
            "Paid"
          ) : (
            <>
              <button
                onClick={() => goForPayment(order._id)}
                className="btn btn-xs"
              >
                Pay
              </button>
            </>
          )}
        </td>
        <td>
          {order?.paid === true ? (
            ""
          ) : (
            <>
              <label
                htmlFor="my-modal-6"
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
              </label>
            </>
          )}
        </td>
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4">
            Are you sure to cancel this order? if you Sure then click 'OK' to
            confirm
          </p>
          <div className="modal-action">
            <label
              onClick={() => deleteOrder(order._id)}
              htmlFor="my-modal-6"
              className="btn"
            >
              OK
            </label>
            <label htmlFor="my-modal-6" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
      </tr>
      <ToastContainer />
    </>
  );
};

export default OrderRow;
