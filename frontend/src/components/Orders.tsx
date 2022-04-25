import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaShoppingBasket } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import {
  delOrder,
  getUserOrders,
  reset,
} from "../redux/features/orders/orderSlice";
import "./styles/Orders.css";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (!user) {
      navigate(`/login`);
      toast.error("Access denied");
    }
    dispatch(getUserOrders(user.data.user_id));
  }, [user, navigate, dispatch]);

  // useEffect(() => {
  //   if (isError) toast.info(message);
  //   if (isSuccess) toast.success(message);
  //   dispatch(reset());
  // }, [dispatch, isError, isSuccess, message]);

  const handleOrderDelete = (order_id: number) => {
    dispatch(delOrder(order_id));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="container">
        <section className="heading">
          <h1>My Orders</h1>
        </section>
        <section className="content">
          {!orders.length ? (
            <h3>You don't have any orders...</h3>
          ) : (
            <div className="order_list">
              {orders.map((order: any) => (
                <ul key={order.order_id} className="order-card">
                  <li>
                    <p>#N: {order.order_id}</p>
                    <p>Status: {order.order_status}</p>
                    <p>{order.created_at}</p>
                    <div className="order-btn-group">
                      <button
                        className="order-btn order-del"
                        onClick={() => handleOrderDelete(order.order_id)}>
                        Delete <MdDeleteForever />
                      </button>
                      <button className="order-btn order-cart">
                        Show cart <FaShoppingBasket />
                      </button>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
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
