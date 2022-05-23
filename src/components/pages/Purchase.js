import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.config";

const Purchase = () => {
  const [order, setOrder] = useState(0);
  const [tool, setTool] = useState([]);
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
        setOrder(oneTool.minOrder);
      });
  }, [id]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  const handleMinOrder = (e) => {
    console.log(e.target.name);
    if (e.target.name === "Order") {
      setOrder(e.target.value);
    }
  };
  return (
    <div className="w-5/6 mx-auto my-10">
      <div>
        <h2>Name: {user.displayName}</h2>
        <h2>Email: {user.email}</h2>
      </div>

      <div className={`card lg:card-side bg-base-100 shadow-xl`}>
        <figure>
          <img src={toolsImage && toolsImage} alt={toolsName} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Tools Name: {toolsName}</h2>
          <p>{toolsDec}</p>

          <h2>
            Address:{" "}
            <input
              name="Email"
              onChange={handleMinOrder}
              type="text"
              placeholder="Your Address"
            />
          </h2>
          <h2>
            Number:{" "}
            <input
              name="Number"
              onChange={handleMinOrder}
              type="number"
              placeholder="Your Phone"
            />
          </h2>
          <h2>
            Minimum Order:{" "}
            <input
              name="Order"
              onChange={handleMinOrder}
              type="number"
              value={order}
            />
          </h2>
          <h2>Available Quantity: {available}</h2>
          <h2>Price: ${toolsPrice}</h2>
          <div className="card-actions justify-end">
            <button
              disabled={
                order === "NaN" || order < minOrder || order > available
              }
              className="btn btn-primary"
            >
              Purchase
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
