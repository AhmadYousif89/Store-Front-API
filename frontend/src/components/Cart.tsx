import * as Hi from "react-icons/hi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/Cart.css";

function ShoppingCart() {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootStateOrAny) => state.user_cart);
  const userCart = JSON.parse(localStorage.getItem("cart") as string);

  const handleItemRemove = (id: string) => {
    return cart.filter((item: { p_id: string }) => item.p_id === id);
  };

  return (
    <section>
      <h1 className="cart-titel">Shopping Cart</h1>
      {!cart?.length ? (
        <div className="cart-empty">
          <p>Your cart is currently empty . . . </p>
          <p className="go-back" onClick={() => navigate("/")}>
            <Hi.HiArrowNarrowLeft /> Start Shopping
          </p>
        </div>
      ) : (
        <section className="cart-container">
          <div className="cart-headers">
            <h3 id="product-titel">Product</h3>
            <h3 id="product-price">Price</h3>
            <h3 id="product-quantity">Quantity</h3>
            <h3 id="product-total">Total</h3>
          </div>
          <div className="cart-products-details">
            {cart.map((item: any) => (
              <div className="cart-item" key={item.p_id}>
                <div className="item-card">
                  <img src={item.image_url} alt={item.p_name} />
                  <div className="item-details">
                    <p id="item-brand">{item.brand}</p>
                    <p id="item-name">{item.p_name}</p>
                    <button
                      id="item-btn"
                      onClick={() => handleItemRemove(item.p_id)}>
                      <Hi.HiShoppingCart /> Remove
                    </button>
                  </div>
                </div>
                <div id="item-price">
                  $ <span>{item.price}</span>
                </div>
                <div id="item-quantity">
                  <Hi.HiOutlinePlusCircle /> |
                  <p id="item-count">{item.productQuantity}</p>
                  | <Hi.HiOutlineMinusCircle />
                </div>
                <div id="item-total">
                  $ <span> {item.productQuantity * item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-details">
            <div className="clear-cart" onClick={() => {}}>
              <MdRemoveShoppingCart />
            </div>
            <div className="cart-checkout">
              <div className="subtotal">
                <p>SUBTOTAL</p>
                <div>
                  <p>$ {cart.totalAmount}</p>
                </div>
              </div>
              <p id="checkout-text">
                Taxes and shipping calculated at checkout
              </p>
              <button id="checkout-btn">CHECK OUT</button>
              <p className="go-back checkout" onClick={() => navigate("/")}>
                <Hi.HiArrowNarrowLeft /> Continue Shopping
              </p>
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default ShoppingCart;
