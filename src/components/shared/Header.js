import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../firebase.config";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  if (loading) {
    return <h1>loading...</h1>;
  }
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/home">Home</Link>
            </li>

            {user && (
              <li>
                <label
                  htmlFor="my-drawer"
                  onClick={() => navigate("dashboard")}
                  className="drawer-button"
                >
                  Dashboard
                </label>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          HAKKANI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/blog">blog</Link>
          </li>
          <li>
            <Link to="/my-portfolio">My Portfolio</Link>
          </li>
          {user && (
            <li>
              <label
                htmlFor="my-drawer"
                onClick={() => navigate("dashboard")}
                className="drawer-button"
              >
                Dashboard
              </label>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? 
          <>
            <h2 className="mr-5 text-xl">{user.displayName}</h2> 
            <Link to="/" onClick={logout} className="btn">
              Logout
            </Link>
            
          </>
        : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
