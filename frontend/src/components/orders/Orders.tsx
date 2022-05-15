import { useEffect } from "react";
import {
  deleteOrder,
  getUserOrders,
  reset,
} from "../../redux/features/orders/orderSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";
import "./styles/Orders.css";
import OrdersList from "./OrdersList";
import { FaArrowLeft } from "react-icons/fa";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isLoading } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect((): any => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
    dispatch(getUserOrders(user?.data.user_id));
    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  const handleOrderDelete = (oId: number) => {
    dispatch(deleteOrder(oId));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="container">
        <div className="heading">
          <h1>My Orders</h1>
        </div>
        <section className="content">
          {!orders.length ? (
            <h3>You don't have any orders...</h3>
          ) : (
            <OrdersList orders={orders} delOrder={handleOrderDelete} />
          )}
          <div className="go_back" onClick={() => navigate("/products")}>
            <FaArrowLeft /> {!orders.length ? "Start Shopping" : "Back"}
          </div>
        </section>
      </section>
    </>
  );
}

export default Orders;
