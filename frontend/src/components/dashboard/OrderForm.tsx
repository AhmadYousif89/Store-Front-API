import { Link } from "react-router-dom";

function OrderForm() {
  return (
    <>
      <ul className="flex orders">
        <li>
          <Link to={"/me/orders"}>
            <div>My Orders</div>
          </Link>
        </li>
        <li>
          <Link to={"/me/orders/add"}>
            <div>Create an Order</div>
          </Link>
        </li>
        <li>
          <Link to={"/me/orders/history"}>
            <div>History</div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default OrderForm;
