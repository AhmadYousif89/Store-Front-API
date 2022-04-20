import { MdDeleteForever } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";
import { delOrder } from "../redux/features/orders/orderSlice";
import Spinner from "./Spinner";
import "./styles/OrderItems.css";

function OrderItem(props: any) {
  const dispatch = useDispatch();

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  const handleOrderDelete = (order_id: number) => {
    dispatch(delOrder(order_id));
    if (isSuccess) toast.success("order deleted");
    if (isError) toast.success(message);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="order_list">
      {props.orders.map((order: any) => (
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
  );
}

export default OrderItem;
