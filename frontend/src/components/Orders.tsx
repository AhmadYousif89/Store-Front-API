import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import {
  getUserOrders,
  deleteOrder,
  reset,
} from "../redux/features/orders/orderSlice";
import "./styles/Orders.css";

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
        <section className="content">
          {orders.length > 0 ? (
            <>
              <div className="order_list">
                {orders.map((order: any) => (
                  <ul key={order.order_id} className="order-card">
                    <li className="order-details">
                      <div>
                        <p className="order-detail">
                          <span> #N: </span> <br />
                          {order.order_id}
                        </p>
                        <p className="order-detail">
                          <span> Status: </span> <br />
                          {order.order_status}
                        </p>
                        <p className="order-detail">
                          <span> Created:</span> <br />
                          {order.created_at}
                        </p>
                      </div>
                      <div className="order-btn-del">
                        <MdDeleteForever
                          onClick={() => dispatch(deleteOrder(order.order_id))}
                        />
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <div className="go_back" onClick={() => navigate(`/`)}>
                <FaArrowLeft /> Back
              </div>
            </>
          ) : (
            <>
              <h3>You don't have any orders...</h3>
              <div className="go_back" onClick={() => navigate("/")}>
                <FaArrowLeft /> Start Shopping
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
}

export default Orders;
