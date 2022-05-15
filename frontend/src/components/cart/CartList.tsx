import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrement,
  increment,
  removeProduct,
} from "../../redux/features/users/cartSlice";
import * as Hi from "react-icons/hi";

type Props = {
  emptyCartItem: () => void;
  cartCheckout: () => void;
  totalAmount: number;
  cart: [];
};

function CartList({ cart, cartCheckout, totalAmount, emptyCartItem }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <section className="cart-container">
        {cart.map((product) => {
          const { p_id, image_url, brand, p_name, color, quantity, price } =
            product;
          return (
            <article className="cart-item" key={p_id}>
              <div className="cart-header">
                <h3 id="product-titel">Product</h3>
                <div className="item-card">
                  <img src={image_url} alt={p_name} />
                  <div className="item-details">
                    <p id="item-brand">{brand}</p>
                    <p id="item-name">{p_name}</p>
                    <p id="item-color">{color}</p>
                    <button
                      id="item-btn"
                      onClick={() => dispatch(removeProduct(product))}>
                      <Hi.HiShoppingCart /> <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="cart-header">
                <h3 id="product-titel">Price</h3>
                <div id="item-price">
                  <span>$</span> <>{price}</>
                </div>
              </div>
              <div className="cart-header">
                <h3 id="product-titel">Quantity</h3>
                <div id="item-quantity">
                  <Hi.HiOutlineMinusCircle
                    onClick={() => dispatch(decrement(product))}
                  />
                  <p id="item-count">{quantity}</p>
                  <Hi.HiOutlinePlusCircle
                    onClick={() => dispatch(increment(product))}
                  />
                </div>
              </div>
              <div className="cart-header">
                <h3 id="product-titel">Total</h3>
                <div id="item-total">
                  <span>$</span> {quantity * price}
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <div className="cart-details">
        <div className="clear-cart" onClick={emptyCartItem}>
          <MdRemoveShoppingCart />
        </div>
        <div className="cart-checkout">
          <div className="subtotal">
            <p>SUBTOTAL</p>
            <p>
              <span>$</span>
              {totalAmount}
            </p>
          </div>
          <p id="checkout-text">Taxes and shipping calculated at checkout</p>
          <button id="checkout-btn" onClick={cartCheckout}>
            CHECK OUT
          </button>
          <p className="go_back checkout" onClick={() => navigate("/products")}>
            <Hi.HiArrowNarrowLeft /> Continue Shopping
          </p>
        </div>
      </div>
    </>
  );
}

export default CartList;
