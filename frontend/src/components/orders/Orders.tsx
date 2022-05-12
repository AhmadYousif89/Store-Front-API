import { useEffect } from "react";
import { getUserOrders, reset } from "../../redux/features/orders/orderSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";
import "./styles/Orders.css";
import OrdersList from "./OrdersList";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isLoading } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect((): any => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
    dispatch(getUserOrders(user.data.user_id));
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="container">
        <div className="heading">
          <h1>My Orders</h1>
        </div>
        <OrdersList orders={orders} />
      </section>
    </>
  );
}

export default Orders;
