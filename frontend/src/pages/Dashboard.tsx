import { useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderForm from "../components/dashboard/OrderForm";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Dashboard</h1>
        <h3>
          Welcome <span>{user ? user.data.u_name.toUpperCase() : null}</span>
        </h3>
      </section>
      <OrderForm />
    </>
  );
}

export default Dashboard;
