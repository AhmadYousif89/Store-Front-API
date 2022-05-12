import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { toast } from "react-toastify";
import ToggleTheme from "./ToggleTheme";
import Sidebar from "./Sidebar";
import "./styles/NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { totalQuantity } = useSelector((state: RootStateOrAny) => state.cart);

  const handleLogOut = () => {
    dispatch(logout(user.jwt));
    toast.info("user logged out", { position: "top-center" });
    navigate("/products");
  };

  return (
    <header className="nav">
      <div className="logo-theme">
        <div id="logo">
          <Link to="/">TechStore</Link>
        </div>
        <ToggleTheme />
      </div>
      <ul>
        {user ? (
          user.jwt !== undefined ? (
            <>
              <ul className="nav-menu">
                <li>
                  <Link to="/dashboard/cart">
                    <div className="cart-count">
                      <FaIcons.FaCartArrowDown /> <span>{totalQuantity}</span>
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
            <ul className="nav-menu">
              <li>
                <Link to="/dashboard/cart">
                  <div className="cart-count">
                    <FaIcons.FaCartArrowDown /> <span>{totalQuantity}</span>
                  </div>
                </Link>
              </li>
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

export default NavBar;
