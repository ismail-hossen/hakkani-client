import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/dashboard">My Orders</Link>
          </li>
          <li>
            <Link to="add-a-review">Add A Review</Link>
          </li>
          <li>
            <Link to="my-profile">My Profile</Link>
          </li>
          <li>
            <Link to="manage-all-orders">Manage All Orders</Link>
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
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
