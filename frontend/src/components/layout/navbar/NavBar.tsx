import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../../utils/CartIcon";
import * as FaIcons from "react-icons/fa";
import ToggleTheme from "../apptheme/ToggleTheme";
import Sidebar from "../sidemenu/Sidebar";
import Spinner from "../../utils/Spinner";
import "./styles/navBar.css";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );
  const { totalQuantity } = useSelector((state: RootStateOrAny) => state.cart);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    return () => {
      dispatch(reset());
    };
  };

  if (isLoading) return <Spinner />;

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
          user.token ? (
            <ul className="nav-menu">
              {user.isadmin && <p>Admin</p>}
              <Sidebar />
              <CartIcon totalQuantity={totalQuantity} />
              <div className="logout" onClick={handleLogOut}>
                Logout <FaIcons.FaSignOutAlt />
              </div>
            </ul>
          ) : null
        ) : (
          <ul className="nav-menu">
            <CartIcon totalQuantity={totalQuantity} />
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
        )}
      </ul>
    </header>
  );
}

export default NavBar;
