import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import { Outlet } from "react-router-dom";
import "./App.css";

function AppLayout() {
  return (
    <main className="app-container">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default AppLayout;
