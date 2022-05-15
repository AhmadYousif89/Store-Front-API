import { MdDeleteForever } from "react-icons/md";

type Props = {
  orders: [Order];
  delOrder: (arg: number) => void;
};
type Order = {
  order_id: number;
  order_status: string;
  created_at: string;
};

function OrdersList({ orders, delOrder }: Props) {
  return (
    <div className="order_list">
      {orders.map((order: Order) => {
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
      })}
    </div>
  );
}

export default OrdersList;
