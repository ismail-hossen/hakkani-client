import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import Service from "./Home/Service";

const Purchase = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const btn = (
    <button onClick={() => navigate("")} className="btn btn-primary">
      Purchase
    </button>
  );

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="w-5/6 mx-auto my-10">
      <div>
        <h2>Name: {user.displayName}</h2>
        <h2>Email: {user.email}</h2>
      </div>
      <Service
        btn={btn}
        text={["Minimum Order: ", <input type="number" value="100" />]}
      ></Service>
    </div>
  );
};

export default Purchase;
