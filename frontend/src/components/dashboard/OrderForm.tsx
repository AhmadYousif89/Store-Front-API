import { Link } from "react-router-dom";

function OrderForm() {
  return (
    <>
      <ul className="orders form-group">
        <li>
          <Link to={"/orders"}>
            <div className="">Create an Order</div>
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
            <div className="">Order History</div>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default OrderForm;
