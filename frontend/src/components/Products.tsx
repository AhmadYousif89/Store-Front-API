import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { getProducts } from "../redux/features/products/productSlice";
import { FaShoppingCart } from "react-icons/fa";
import "./styles/Products.css";
import { createOrder } from "../redux/features/orders/orderSlice";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    if (user) {
      dispatch(createOrder({ userId: user.data.user_id }));
    }
    toast.info("please login first");
    navigate("/login");
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>New Arrivals</h1>
      </section>
      {!products ? (
        <p>Store Is Empty Right Now , Sorry.</p>
      ) : (
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
      )}
    </>
  );
}

export default Products;
