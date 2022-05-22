import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/pages/Home/Header";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </div>
  );
}

export default App;
