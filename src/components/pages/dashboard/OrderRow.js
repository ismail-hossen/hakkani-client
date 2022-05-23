import React from "react";

const OrderRow = ({order,index}) => {
  return (
    <tr key={order._id}>
      <th>{index + 1}</th>
      <td>{order.userName}</td>
      <td>{order.order}</td>
      <td>{order.email}</td>
    </tr>
  );
};

export default OrderRow;
