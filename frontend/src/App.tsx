import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { displayCartInfo } from "./redux/features/users/cartSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AppLayout from "./AppLayout";

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
          <Routes>
            <Route path="" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="products" element={<Products />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="dashboard" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
