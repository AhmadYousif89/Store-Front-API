import "./styles/Header.css";
import * as FaIcons from "react-icons/fa";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { logout, reset } from "../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, message } = useSelector((state: RootStateOrAny) => state.auth);

  const handleLogOut = () => {
    dispatch(logout(user.jwt.token));
    toast.info(message);
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div id="logo">
        <Link to="/">TechStore</Link>
      </div>
      <ul>
        {user ? (
          user.jwt !== undefined ? (
            <>
              <ul className="nav-container">
                <li>
                  <Link to={user ? `dashboard/${user.data.name}` : "dashboard"}>
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
          ) : (
            <>
              <ul className="nav-container">
                <li>
                  <Link to="/register">
                    <FaIcons.FaUser /> Register
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <FaIcons.FaSignInAlt /> Login
                  </Link>
                </li>
              </ul>
            </>
          )
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
