import { displayCartInfo } from "../../redux/features/users/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as Hi from "react-icons/hi";
import CartList from "./CartList";
import "./styles/Cart.css";

function ShoppingCart(props: { cart: []; totalAmount: number }) {
  const { cart, totalAmount } = props;
  const emptyCartImg =
    window.location.origin + "/assets/empty-shopping-cart.png";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(displayCartInfo());
  }, [props.cart, dispatch]);

  return (
    <>
      <h2>Shopping Cart</h2>
      {!cart.length ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <img src={emptyCartImg} alt="empty-cart" width={"400px"} />
          <p className="go_back" onClick={() => navigate("/products")}>
            <Hi.HiArrowNarrowLeft /> Start Shopping
          </p>
        </div>
      ) : (
        <CartList cart={cart} totalAmount={totalAmount} />
      )}
    </>
  );
}

export default ShoppingCart;
