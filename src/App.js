import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/pages/Home/Footer";
import Header from "./components/pages/Home/Header";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
