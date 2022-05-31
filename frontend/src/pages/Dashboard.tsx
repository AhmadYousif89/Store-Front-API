import { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  useEffect((): any => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
  }, [user, navigate, dispatch]);

  return (
    <section>
      <h1 className="titel">Dashboard</h1>
    </section>
  );
}

export default Dashboard;
