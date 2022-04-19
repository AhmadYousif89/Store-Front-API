import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder, reset } from "../../features/orders/orderSlice";
import Spinner from "../Spinner";
import "../styles/Products.css";

function ProductItems(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.orders,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, user, navigate, dispatch]);

  function handleAddToCart() {
    dispatch(createOrder(user.data.user_id));
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      {props.products.map((product: any) => (
        <ul className="grid product-item" key={product.p_id}>
          <h3 id="brand">{product.brand}</h3>
          <div>
            <img src={product.image_url} alt={product.p_name} />
          </div>
          <div className="card_details">
            <h5>{product.p_name}</h5>
            <p>{product.description}</p>
            <span className="flex price-tag">
              $ <p id="price">{product.price}</p>
            </span>
          </div>
          <button className="flex btn_card" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to cart
          </button>
        </ul>
      ))}
    </>
  );
}

export default ProductItems;
