import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder, reset } from "../features/orders/orderSlice";
import Spinner from "./Spinner";
import "./styles/ProductItem.css";

function ProductItems(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { orders, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (orders.length === 0) return;
    if (isError) toast.error(message);
    dispatch(reset());
  }, [orders, isError, message, user, dispatch]);

  function handleAddToCart() {
    dispatch(createOrder({ userId: user.data.user_id }));
    toast.success("order created");
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      {props.products.map((product: any) => (
        <ul className="product-card" key={product.p_id}>
          <div id="img-card">
            <img src={product.image_url} alt={product.p_name} />
          </div>
          <div className="card_details">
            <p id="brand">{product.brand}</p>
            <h5>{product.p_name}</h5>
            <p>{product.description}</p>
            <span className="price-tag">
              $ <p id="price">{product.price}</p>
            </span>
            <button className="btn-card" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to cart
            </button>
          </div>
        </ul>
      ))}
    </>
  );
}

export default ProductItems;
