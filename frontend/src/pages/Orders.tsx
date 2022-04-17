import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderItem from "../components/dashboard/OrderItem";
import Spinner from "../components/Spinner";
import { getOrders } from "../features/orders/orderSlice";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  const customId = "orders message";
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message, { toastId: customId });
    }
    dispatch(getOrders());
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
            <OrderItem orders={orders} />
          </div>
        ) : (
          <h3>You don't have any orders...</h3>
        )}
      </section>
      <Link className="flex" to={`/dashboard/${user.data.name}`}>
        <div className="go_back">
          <FaAngleLeft /> Go Back <FaAngleRight />
        </div>
      </Link>
    </>
  );
}

export default Orders;
