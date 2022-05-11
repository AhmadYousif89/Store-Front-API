import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { displayCartInfo } from "./redux/features/users/cartSlice";

export const ThemeContext = createContext<{
  theme: string;
  toggleTheme: Function;
} | null>(null);

function App() {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const { cart } = useSelector((state: RootStateOrAny) => state.cart);

  useEffect(() => {
    dispatch(displayCartInfo());
  }, [cart, dispatch]);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ToastContainer
          theme="colored"
          autoClose={3000}
          position={"bottom-left"}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
        />
        <div className="app-container" id={theme}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/orders" element={<Orders />} />
            <Route path="dashboard/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
