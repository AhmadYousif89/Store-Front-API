import { useEffect } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getOrders } from "../features/orders/orderSlice";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("data generated");
    }
    // dispatch(getOrders());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>My Orders</h1>
      </section>
      <section className="content">
        {orders.length > 0 ? (
          <div className="">
            <p>list of orders: </p>
            {orders.map((order: any) => (
              <ul className="order">
                <li key={order.order_id}>
                  <p>order number : {order.order_id}</p>
                  <p>order status : {order.order_status}</p>
                </li>
              </ul>
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
