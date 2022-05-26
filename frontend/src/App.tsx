import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { displayCartInfo } from "./redux/features/users/cartSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Products from "./components/products/Products";
import SingleProduct from "./components/products/SingleProduct";

import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export type Theme = {
  theme: string;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<Theme>({
  theme: "",
  toggleTheme: () => {},
});

function App() {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const { cart, totalAmount } = useSelector(
    (state: RootStateOrAny) => state.cart,
  );

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
          toastStyle={{ width: "400px" }}
        />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productID" element={<SingleProduct />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="dashboard/cart"
              element={<Cart cart={cart} totalAmount={totalAmount} />}
            />
            <Route path="dashboard/orders" element={<Orders />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
