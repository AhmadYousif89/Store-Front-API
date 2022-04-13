import { Link } from "react-router-dom";

function OrderForm() {
  return (
    <>
      <ul className="flex orders">
        <li>
          <Link to={"/orders"}>
            <div>My Orders</div>
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
            <div>Create an Order</div>
          </Link>
        </li>
        <li>
          <Link to={"/orders/history"}>
            <div>History</div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default OrderForm;
