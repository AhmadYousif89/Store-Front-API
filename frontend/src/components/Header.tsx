import { logout } from "../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "./styles/Header.css";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const [mood, setMood] = useState(false);

  const handleLogOut = () => {
    dispatch(logout(user.jwt));
    toast.info("user logged out");
    navigate("/");
  };

  return (
    <header className="header">
      <div id="logo">
        <Link to="/">TechStore</Link>
      </div>
      <div className="mood-toggle">
        <input
          type="checkbox"
          name="checkbox"
          id="checkbox"
          onChange={() => setMood(!mood)}
        />
        <label htmlFor="checkbox" className="label">
          <FaIcons.FaMoon className="moon" />
          <FaIcons.FaSun className="sun" />
          <div className="ball" />
        </label>
      </div>
      <ul>
        {user ? (
          user.jwt !== undefined ? (
            <>
              <ul className="nav-container">
                <li>
                  <Link to="dashboard">
                    <div className="cart-count">
                      <FaIcons.FaCartArrowDown /> <span>0</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="logout" onClick={handleLogOut}>
                    Logout <FaIcons.FaSignOutAlt />
                  </div>
                </li>
                <Sidebar />
              </ul>
            </>
          ) : null
        ) : (
          <>
            <ul className="nav-container">
              <li>
                <Link className="icon" to="/register">
                  <FaIcons.FaUser /> Register
                </Link>
              </li>
              <li>
                <Link className="icon" to="/login">
                  <FaIcons.FaSignInAlt /> Login
                </Link>
              </li>
            </ul>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
