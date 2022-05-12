import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import "./styles/Sidebar.css";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar((pv) => !pv);
  };

  return (
    <>
      <div id="nav">
        <Link to="#" className="sidebar-icon">
          <FaIcons.FaBars onClick={handleSidebar} />
        </Link>
      </div>
      <nav
        onMouseUp={handleSidebar}
        className={!sidebar ? "sidebar-menu show" : "sidebar-menu"}>
        <ul className="sidebar-items">
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"/"}>
              <HiIcons.HiHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"dashboard"}>
              <AiIcons.AiFillSetting /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"/dashboard/orders"}>
              <HiIcons.HiClipboardList /> My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"/dashboard/cart"}>
              <FaIcons.FaShoppingCart /> Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"/contact"}>
              <GrIcons.GrContactInfo /> Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "ActiveBorder" : "GrayText",
              })}
              className="sidebar-link"
              to={"/about"}>
              <FaIcons.FaInfoCircle /> About
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
