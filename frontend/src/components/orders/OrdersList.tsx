import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  orders: [];
  delOrder: (arg: number) => void;
};
type Order = {
  order_id: number;
  order_status: string;
  created_at: string;
};

function OrdersList({ orders, delOrder }: Props) {
  const navigate = useNavigate();

  const showOrders = orders.map((order: Order) => {
    const { created_at, order_id, order_status } = order;
    return (
      <ul key={order_id} className="order-card">
        <li className="order-details">
          <div>
            <p className="order-detail">
              <span> #N: </span> <br />
              {order_id}
            </p>
            <p className="order-detail">
              <span> Status: </span> <br />
              {order_status}
            </p>
            <p className="order-detail">
              <span> Created:</span> <br />
              {created_at}
            </p>
          </div>
          <div className="order-btn-del">
            <MdDeleteForever onClick={() => delOrder(order_id)} />
          </div>
        </li>
      </ul>
    );
  });

  return (
    <section className="content">
      {orders.length > 0 ? (
        <div className="order_list">{showOrders}</div>
      ) : (
        <>
          <h3>You don't have any orders...</h3>
          <div className="go_back" onClick={() => navigate("/products")}>
            <FaArrowLeft /> {orders.length < 0 ? "Start Shopping" : "Back"}
          </div>
        </>
      )}
    </section>
  );
}

export default OrdersList;
