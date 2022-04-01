import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout, reset } from "../features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  const handleLogOut = () => {
    if (user) {
      toast.info("logging out");
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TechStore</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
        <li>
          <div className="logout" onClick={handleLogOut}>
            <FaSignOutAlt /> Logout
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
