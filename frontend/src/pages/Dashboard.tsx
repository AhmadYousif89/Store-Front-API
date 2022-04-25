import { useEffect } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return <div>Dashboard</div>;
}

export default Dashboard;
