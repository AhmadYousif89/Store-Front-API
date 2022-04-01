import { BrowserRouter as BR, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <BR>
        <ToastContainer
          pauseOnFocusLoss={false}
          autoClose={2000}
          position={"top-center"}
        />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </BR>
    </>
  );
}

export default App;
