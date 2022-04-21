import { BrowserRouter as BR, Routes, Route } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Dashboard from "./pages/Products";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
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
            <Route path="register" element={<Register />} />
            <Route
              path={user ? `dashboard/${user.data.name}` : "dashboard"}
              element={<Dashboard />}
            />
            <Route path="me/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BR>
    </>
  );
}

export default App;
