import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderItem from "../components/OrderItems";
import Spinner from "../components/Spinner";
import { getOrders } from "../features/orders/orderSlice";
import "./styles/Orders.css";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const orders = JSON.parse(localStorage.getItem("orders") as any);
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
    if (isError) toast.error(message);
    dispatch(getOrders(user.data.user_id));
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="container">
        <section className="heading">
          <h1>My Orders</h1>
        </section>
        <section className="content">
          {orders.length > 0 ? (
            <OrderItem orders={orders} />
          ) : (
            <h3>You don't have any orders...</h3>
          )}
        </section>
        <div
          className="go_back"
          onClick={() => navigate(`/dashboard/${user.data.name}`)}>
          <FaAngleLeft /> Go Back <FaAngleRight />
        </div>
      </div>
    </>
  );
}

export default Orders;
