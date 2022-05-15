import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./App";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import "./App.css";

function AppLayout() {
  const { theme } = useContext(ThemeContext);
  return (
    <main className="app-container">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default AppLayout;
