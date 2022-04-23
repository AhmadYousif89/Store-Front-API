import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getProducts } from "../redux/features/products/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import "./styles/Products.css";
import { createOrder, reset } from "../redux/features/orders/orderSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const {
    orders,
    message: orderMsg,
    isError: orderError,
    isSuccess: orderSuccess,
  } = useSelector((state: RootStateOrAny) => state.orders);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Access denied");
    }
    if (isError) toast.error(message);
    dispatch(getProducts());
  }, [user, isError, message, navigate, dispatch]);

  // useEffect(() => {
  //   if (orders.length === 0) return;
  //   if (orderError) toast.error(orderMsg);
  //   if (orderSuccess) toast.success(orderMsg);
  //   dispatch(reset());
  // }, [orderError, orderMsg, dispatch, orderSuccess, orders.length]);

  function handleAddToCart() {
    dispatch(createOrder({ userId: user.data.user_id }));
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h3>
          Welcome <span>{user ? user.data.name.toUpperCase() : null}</span>
        </h3>
        <h1>New Arrivals</h1>
      </section>
      <section className="products">
        {products.map((product: any) => (
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
      </section>
    </>
  );
}

export default Dashboard;
