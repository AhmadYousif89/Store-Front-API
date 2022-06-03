import { MdRemoveShoppingCart } from "react-icons/md";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrement,
  emptyCart,
  increment,
  removeProduct,
} from "../../redux/features/users/cartSlice";
import * as Hi from "react-icons/hi";
import PayButton from "./StripePayButton";

type Props = {
  cart: [];
  totalAmount: number;
};

function CartList({ cart, totalAmount }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  return (
    <section className="cart-container">
      <article className="cart-wrapper">
        <div className="cart-header">
          <h3 className="titel">Product</h3>
          <h3 className="titel">Price</h3>
          <h3 className="titel">Quantity</h3>
          <h3 className="titel">Total</h3>
        </div>
        {cart.map((product) => {
          const { _id, image_url, p_name, quantity, price } = product;
          return (
            <ul key={_id} className="item-details">
              <li className="item-info">
                <div className="item-image">
                  <p className="item-brand">{p_name}</p>
                  <img src={image_url} alt={p_name} />
                  <button
                    className="item-btn"
                    onClick={() => {
                      dispatch(removeProduct(product));
                    }}>
                    <Hi.HiShoppingCart /> <span>Remove</span>
                  </button>
                </div>
              </li>
              <li className="product-price">
                <div className="item-price">
                  <span>$</span> <>{price}</>
                </div>
              </li>
              <li className="product-quantity">
                <div className="item-quantity">
                  <Hi.HiOutlineMinusCircle
                    onClick={() => dispatch(decrement(product))}
                  />
                  <p className="item-count">{quantity}</p>
                  <Hi.HiOutlinePlusCircle
                    onClick={() => dispatch(increment(product))}
                  />
                </div>
              </li>
              <li className="product-total">
                <div className="item-total">
                  <span>$</span> {quantity * price}
                </div>
              </li>
            </ul>
          );
        })}
      </article>
      <hr />
      <br />
      <section className="cart-details">
        <div
          className="clear-cart"
          onClick={() => {
            dispatch(emptyCart());
            navigate("/products");
          }}>
          <MdRemoveShoppingCart />
        </div>
        <div className="cart-checkout">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>
              <span>$</span>
              {totalAmount}
            </p>
          </div>
          <p id="checkout-text">Taxes and shipping calculated at checkout</p>
          {user ? (
            <PayButton cartItems={cart} />
          ) : (
            <button
              className="checkout-btn login-to-checkout"
              onClick={() => navigate("/login")}>
              Login To Checkout
            </button>
          )}
          <p className="go_back checkout" onClick={() => navigate("/products")}>
            <Hi.HiArrowNarrowLeft /> Continue Shopping
          </p>
        </div>
      </section>
    </section>
  );
}

export default CartList;
