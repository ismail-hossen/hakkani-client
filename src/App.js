import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/pages/Home/Header";
import Home from "./components/pages/Home/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
