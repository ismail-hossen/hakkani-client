import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";

const Dashboard = () => {
  const [adminState, setAdminState] = useState([]);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    fetch(`https://pure-refuge-14003.herokuapp.com/admin/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdminState(data[0]));
  }, [user]);
  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {adminState?.role !== "admin" && (
            <>
              <li>
                <Link to="/dashboard">My Orders</Link>
              </li>
              <li>
                <Link to="add-a-review">Add A Review</Link>
              </li>
              <li>
                <Link to="my-profile">My Profile</Link>
              </li>
            </>
          )}

          {adminState?.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard">Manage All Orders</Link>
              </li>
              <li>
                <Link to="add-a-product">Add A Product</Link>
              </li>
              <li>
                <Link to="make-admin">Make Admin</Link>
              </li>
              <li>
                <Link to="manage-products">Manage Products</Link>
              </li>
              <li>
                <Link to="my-profile">My Profile</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
