import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
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
            <Link className="sidebar-link" to={"/"}>
              <HiIcons.HiHome /> Home
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={`dashboard`}>
              <AiIcons.AiFillSetting /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders"}>
              <HiIcons.HiClipboardList /> My Orders
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders/history"}>
              <FaIcons.FaHistory /> History
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders/cart"}>
              <FaIcons.FaShoppingCart /> Cart
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/contact"}>
              <GrIcons.GrContactInfo /> Contact
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/about"}>
              <FaIcons.FaInfoCircle /> About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
