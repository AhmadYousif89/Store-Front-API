import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

import "./styles/sidebar.css";
import { Links } from "./quickLinks";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar((pv) => !pv);
  };

  return (
    <>
      <div className="sidebar-icon">
        <FaBars onClick={handleSidebar} />
      </div>
      <nav className={!sidebar ? "sidebar-menu show" : "sidebar-menu"}>
        <ul className="sidebar-items">
          {Links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }>
              {link.icon} {link.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
