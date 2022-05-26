import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";
import Purchase from "./components/pages/Purchase";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import auth from "./firebase.config";
import MakeAdmin from "./components/pages/dashboard/adminRoute/MakeAdmin";
import MyOrders from "./components/pages/dashboard/userRoute/MyOrders";
import ManageOrders from "./components/pages/dashboard/adminRoute/ManageOrders";
import AddReview from "./components/pages/dashboard/userRoute/AddReview";
import Payments from "./components/payments/Payments";

function App() {
  const [adminState, setAdminState] = useState([]);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    fetch(`http://localhost:5000/admin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAdminState(data[0]));
  }, [user]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  const publicRoute = [
    { path: "/", Element: Home },
    { path: "/home", Element: Home },
    { path: "/login", Element: Login },
    { path: "/signup", Element: Signup },
  ];

  return (
    <div>
      <Header />
      <Routes>
        {/* public routes */}
        {publicRoute.map(({ path, Element }, index) => (
          <Route key={index} path={path} element={<Element />} />
        ))}
        <Route path="/payment/:id" element={<Payments />}></Route>
        <Route path="/payment" element={<Payments />}></Route>
        <Route
          path="/place-order/:id"
          element={
            <PrivateRoute>
              <Purchase></Purchase>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {adminState?.role === "admin" && (
            <Route path="make-admin" element={<MakeAdmin></MakeAdmin>} />
          )}
          <Route
            index
            element={
              adminState?.role === "admin" ? <ManageOrders /> : <MyOrders />
            }
          />
          <Route path="add-a-review" element={<AddReview />}></Route>
          <Route path="my-profile"></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
