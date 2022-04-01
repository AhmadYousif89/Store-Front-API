import { useEffect } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderItem from "../components/dashboard/OrderItem";
import Spinner from "../components/Spinner";
import { getOrders } from "../features/orders/orderSlice";
import { reset } from "../features/users/userSlice";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getOrders());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Orders Page</h1>
        <p>. . .</p>
      </section>
      <section className="content">
        {orders.length > 0 ? (
          <div className="orders">
            {orders.map((order: { order_id: any }) => (
              <OrderItem key={order.order_id} order={order} />
            ))}
          </div>
        ) : (
          <h3>You have not set any orders</h3>
        )}
      </section>
    </>
  );
}

export default Orders;
