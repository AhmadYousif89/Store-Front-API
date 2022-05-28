import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Orders } from "../../types/types";

type Props = {
  orders: [Orders];
};

function OrdersList({ orders }: Props) {
  const dispatch = useDispatch();

  return (
    <div className="order_list">
      {orders.map((order: Orders) => {
        const { _id, order_status, created_at } = order;
        return (
          <ul key={_id} className="order-card">
            <li className="order-details">
              <div>
                <p className="order-detail">
                  <span> #N: </span> <br />
                  {_id}
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
                <MdDeleteForever onClick={() => {}} />
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default OrdersList;
