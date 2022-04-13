import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCartArrowDown,
  FaShoppingBag,
} from "react-icons/fa";
import { logout, reset } from "../features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  const handleLogOut = () => {
    toast.info("logging out");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex header">
      <div className="logo">
        <Link to="/">TechStore</Link>
      </div>
      <ul className="flex">
        {user ? (
          <>
            <li>
              <Link to={user ? `dashboard/${user.data.u_name}` : "dashboard"}>
                <div>
                  <span className="cart-count">0</span> <FaCartArrowDown />
                </div>
              </Link>
            </li>
            <li>
              <div className="logout" onClick={handleLogOut}>
                <FaSignOutAlt /> Logout
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
