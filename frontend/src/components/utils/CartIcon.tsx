import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  totalQuantity: number;
};

function CartIcon({ totalQuantity }: Props) {
  return (
    <Link to="/dashboard/cart">
      <div className="cart-count">
        <FaCartArrowDown /> <span>{totalQuantity}</span>
      </div>
    </Link>
  );
}

export default CartIcon;
