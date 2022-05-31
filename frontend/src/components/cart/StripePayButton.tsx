import { useDispatch } from "react-redux";
import { stripCheckout } from "../../redux/features/users/cartSlice";

type Props = {
  cartItems: object[];
};

function PayButton({ cartItems }: Props) {
  const dispatch = useDispatch();

  return (
    <button
      className="checkout-btn"
      onClick={() => dispatch(stripCheckout({ cartItems }))}>
      Checkout
    </button>
  );
}

export default PayButton;
