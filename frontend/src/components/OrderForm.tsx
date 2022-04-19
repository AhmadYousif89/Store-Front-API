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
          <Link to={"/me/orders/cart"}>
            <div>Shopping Cart</div>
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
