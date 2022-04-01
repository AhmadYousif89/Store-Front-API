import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
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
        <h1>Welcome {user && user.data.u_name}</h1>
        <p>User Dashboard</p>
      </section>
      <OrderForm />
    </>
  );
}

export default Dashboard;
