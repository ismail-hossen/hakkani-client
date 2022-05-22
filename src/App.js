import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./components/pages/dashboard/Dashboard";
import MyOrders from "./components/pages/dashboard/MyOrders";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";
import Purchase from "./components/pages/Purchase";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/place-order/:id"
          element={
            <PrivateRoute>
              <Purchase></Purchase>
            </PrivateRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          <Route index element={<MyOrders></MyOrders>}></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
