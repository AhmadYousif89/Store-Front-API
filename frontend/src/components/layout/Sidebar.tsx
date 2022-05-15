import { NavLink } from "react-router-dom";
import { useState } from "react";
import * as Fa from "react-icons/fa";
import * as Hi from "react-icons/hi";
import * as Ai from "react-icons/ai";
import "./styles/Sidebar.css";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar((pv) => !pv);
  };

  return (
    <>
      <div className="sidebar-icon">
        <Fa.FaBars onClick={handleSidebar} />
      </div>
      <nav className={!sidebar ? "sidebar-menu show" : "sidebar-menu"}>
        <ul className="sidebar-items">
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/"}>
            <Hi.HiHome /> Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/products"}>
            <Ai.AiOutlineCodeSandbox /> Products
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/dashboard"}>
            <Ai.AiFillSetting /> Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/dashboard/orders"}>
            <Hi.HiClipboardList /> Orders
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/dashboard/cart"}>
            <Fa.FaShoppingCart /> Cart
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/contact"}>
            <Ai.AiOutlineContacts /> Contact
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            to={"/about"}>
            <Fa.FaInfoCircle /> About
          </NavLink>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
