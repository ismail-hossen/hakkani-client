import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.config";

const Purchase = () => {
  const [tool, setTool] = useState([]);
  const [order, setOrder] = useState({
    order: 0,
    number: null,
    address: "",
  });
  const { toolsImage, toolsName, toolsPrice, available, toolsDec, minOrder } =
    tool;
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    fetch("http://localhost:5000/tools-collection")
      .then((res) => res.json())
      .then((data) => {
        const oneTool = data?.find((data) => data._id === id);
        setTool(oneTool);
        setOrder({ order: oneTool.minOrder });
      });
  }, [id]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  const handleMinOrder = (e) => {
    if (e.target.name === "Order") {
      setOrder({ ...order, order: e.target.value });
    }
    if (e.target.name === "Number") {
      setOrder({ ...order, number: e.target.value });
    }
    if (e.target.name === "Address") {
      setOrder({ ...order, address: e.target.value });
    }
  };

  const onSubmit = (user, order) => {
    const userInfo = {
      email: user.email,
      address: order.address,
      userName: user.displayName,
      order: order.order,
      number: order.number,
    };
    console.log(userInfo);
    fetch("http://localhost:5000/order-collection", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="w-5/6 mx-auto my-10">
      <div className={`card lg:card-side bg-base-100 shadow-xl`}>
        <figure className="lg:w-3/6">
          <img src={toolsImage && toolsImage} alt={toolsName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Tools Name: {toolsName}</h2>
          <p>{toolsDec}</p>
          <h2>Available Quantity: {available}</h2>
          <h2>Price: ${toolsPrice}</h2>
          <h2>Minimum Order: {minOrder}</h2>
          <div className="card-actions justify-end">
            <div>
              <h1 className="text-xl">
                If you wants buy. to fullfil the form{" "}
              </h1>
              <h2>
                <label htmlFor="userName">Name:</label>
                <input
                  id="userName"
                  readOnly
                  value={user.displayName}
                  placeholder="Your Name"
                />
              </h2>
              <h2>
                <label htmlFor="Email">Email:</label>
                <input
                  id="Email"
                  readOnly
                  value={user.email}
                  placeholder="Your Email"
                />
              </h2>
              <h2>
                Address:{" "}
                <input
                  onChange={handleMinOrder}
                  name="Address"
                  type="text"
                  placeholder="Your Address"
                />
              </h2>
              <h2>
                Number:{" "}
                <input
                  onChange={handleMinOrder}
                  name="Number"
                  type="number"
                  placeholder="Your Phone"
                />
              </h2>
              <h2>
                Minimum Order:{" "}
                <input
                  placeholder="Order"
                  name="Order"
                  onChange={handleMinOrder}
                  type="number"
                  value={order.order}
                />
              </h2>
              <p className="text-red-500 text-sm">
                {(order.order < minOrder && "Please purchase minimum order!") ||
                  (order.order > available && "Don't available much tool!")}
              </p>
              <button
                onClick={() => onSubmit(user, order)}
                disabled={order.order < minOrder || order.order > available}
                className="btn btn-primary"
              >
                Purchase
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
