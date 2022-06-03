import { useEffect } from "react";
import {
  getUserOrders,
  reset,
} from "../../../redux/features/orders/orderSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../utils/Spinner";
import "./styles/Orders.css";
import OrdersList from "./OrdersList";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isLoading } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
    dispatch(getUserOrders());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="orders-container">
        {!orders.length ? (
          <h3>You don't have any orders...</h3>
        ) : (
          <>
            <h1 className="title">Orders</h1>
            <OrdersList orders={orders} />
          </>
        )}
      </section>
    </>
  );
}

export default Orders;
