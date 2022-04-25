import { BrowserRouter as BR, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <>
      <BR>
        <ToastContainer
          theme="colored"
          autoClose={2000}
          position={"top-center"}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
        />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="me/orders" element={<Orders />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BR>
    </>
  );
}

export default App;
