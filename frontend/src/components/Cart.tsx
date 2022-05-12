import { displayCartInfo, emptyCart } from "../redux/features/users/cartSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as Hi from "react-icons/hi";
import CartList from "./CartList";
import "./styles/Cart.css";

function ShoppingCart() {
  const emptyCartImg =
    window.location.origin + "/assets/empty-shopping-cart.png";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { cart, totalAmount } = useSelector(
    (state: RootStateOrAny) => state.cart,
  );

  useEffect(() => {
    dispatch(displayCartInfo());
  }, [cart, dispatch]);

  const handleEmptyCart = () => {
    dispatch(emptyCart());
    navigate("/products");
  };

  const handleCartCheckout = () => {
    if (!user) {
      toast.info("please login first");
      navigate("/login");
    } else {
      toast.info("to be implemented");
    }
  };

  return (
    <section>
      <h1 className="cart-titel">Shopping Cart</h1>
      {!cart.length ? (
        <div className="cart-empty">
          <p>Your cart is currently empty . . . </p>
          <img src={emptyCartImg} alt="empty-cart" width={"400px"} />
          <p className="go_back" onClick={() => navigate("/products")}>
            <Hi.HiArrowNarrowLeft /> Start Shopping
          </p>
        </div>
      ) : (
        <CartList
          cart={cart}
          cartTotalAmount={totalAmount}
          emptyCartItem={handleEmptyCart}
          cartCheckout={handleCartCheckout}
        />
      )}
    </section>
  );
}

export default ShoppingCart;
