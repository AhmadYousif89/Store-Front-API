import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./styles/Sidebar.css";
import { RootStateOrAny, useSelector } from "react-redux";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div id="nav">
        <Link to="#" className="sidebar-icon">
          <FaIcons.FaBars onClick={handleSidebar} />
        </Link>
      </div>
      <nav
        onMouseLeave={handleSidebar}
        className={!sidebar ? "sidebar-menu show" : "sidebar-menu"}>
        <ul className="sidebar-items">
          <li>
            <Link className="sidebar-link" to={"/"}>
              <FaIcons.FaHome /> Home
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={`dashboard/${user.data.name}`}>
              <FaIcons.FaDashcube /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders"}>
              <FaIcons.FaJediOrder /> My Orders
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders/history"}>
              <FaIcons.FaHistory /> Order History
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/orders/cart"}>
              <FaIcons.FaShoppingBag /> Shopping Cart
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to={"me/about"}>
              <FaIcons.FaUser /> About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
