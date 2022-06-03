import { useSelector, RootStateOrAny } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./styles/dashboard.css";

function Dashboard() {
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <div className="dashboard-container">
      <section className="quicklinks-container">
        <h1 className="title">Dashboard</h1>
        <ul className="quicklinks-list">
          <li className="link">
            <NavLink
              className={({ isActive }) => (isActive ? "quicklink active" : "")}
              to="profile">
              Profile
            </NavLink>
          </li>
          <li className="link">
            <NavLink
              className={({ isActive }) => (isActive ? "quicklink active" : "")}
              to="orders">
              Orders
            </NavLink>
          </li>
          <li className="link">
            {user?.isadmin && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "quicklink active" : ""
                }
                to="create-product">
                Products
              </NavLink>
            )}
          </li>
        </ul>
      </section>
      <section className="dashboard-elements">
        <Outlet />
      </section>
    </div>
  );
}

export default Dashboard;
