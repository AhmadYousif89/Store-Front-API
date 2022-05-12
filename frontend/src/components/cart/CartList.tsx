import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decrement,
  increment,
  removeProduct,
} from "../../redux/features/users/cartSlice";
import * as Hi from "react-icons/hi";

function CartList(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-container">
        {props.cart.map((item: any) => (
          <div className="cart-item" key={item.p_id}>
            <div className="cart-header">
              <h3 id="product-titel">Product</h3>
              <div className="item-card">
                <img src={item.image_url} alt={item.p_name} />
                <div className="item-details">
                  <p id="item-brand">{item.brand}</p>
                  <p id="item-name">{item.p_name}</p>
                  <p id="item-color">
                    color: <br /> {item.color}
                  </p>
                  <button
                    id="item-btn"
                    onClick={() => dispatch(removeProduct(item))}>
                    <Hi.HiShoppingCart /> Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="cart-header">
              <h3 id="product-titel">Price</h3>
              <div id="item-price">
                <span>$</span> <>{item.price}</>
              </div>
            </div>

            <div className="cart-header">
              <h3 id="product-titel">Quantity</h3>
              <div id="item-quantity">
                <Hi.HiOutlineMinusCircle
                  onClick={() => dispatch(decrement(item))}
                />
                <p id="item-count">{item.quantity}</p>
                <Hi.HiOutlinePlusCircle
                  onClick={() => dispatch(increment(item))}
                />
              </div>
            </div>

            <div className="cart-header">
              <h3 id="product-titel">Total</h3>
              <div id="item-total">
                <span>$</span> {item.quantity * item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-details">
        <div className="clear-cart" onClick={props.emptyCartItem}>
          <MdRemoveShoppingCart />
        </div>
        <div className="cart-checkout">
          <div className="subtotal">
            <p>SUBTOTAL</p>
            <p>
              <span>$</span>
              {props.cartTotalAmount}
            </p>
          </div>
          <p id="checkout-text">Taxes and shipping calculated at checkout</p>
          <button id="checkout-btn" onClick={props.cartCheckout}>
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
