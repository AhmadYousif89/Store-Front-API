import Footer from "./components/layout/footer/Footer";
import NavBar from "./components/layout/navbar/NavBar";
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
