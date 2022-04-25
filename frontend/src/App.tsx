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
import { useState, createContext } from "react";
import "./App.css";

export const ThemeContext = createContext<{
  theme: string;
  toggleTheme: Function;
} | null>(null);

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <BR>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ToastContainer
            theme="colored"
            autoClose={2000}
            position={"top-center"}
            hideProgressBar={true}
            pauseOnFocusLoss={false}
          />
          <div className="app-container" id={theme}>
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
        </ThemeContext.Provider>
      </BR>
    </>
  );
}

export default App;
