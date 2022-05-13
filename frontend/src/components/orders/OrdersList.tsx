import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../../redux/features/orders/orderSlice";

function OrdersList(props: { orders: any[] }) {
  const { orders } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showOrders = orders.map((order: any) => (
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
  ));

  return (
    <section className="content">
      {orders.length > 0 ? (
        <div className="order_list">{showOrders}</div>
      ) : (
        <>
          <h3>You don't have any orders...</h3>
          <div className="go_back" onClick={() => navigate("/products")}>
            <FaArrowLeft /> {!orders.length ? "Start Shopping" : "Back"}
          </div>
        </>
      )}
    </section>
  );
}

export default OrdersList;
