import "./styles/Products.css";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { addToCart } from "../redux/features/users/cartSlice";
import { IoIosColorPalette } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { getProducts, reset } from "../redux/features/products/productSlice";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect((): any => {
    dispatch(getProducts());
    return () => dispatch(reset());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="main-header">
        <h1>New Arrivals</h1>
      </section>
      {!products.length ? (
        <p>Store Is Under Construction , Sorry.</p>
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
                  <span>$</span> <p id="price">{product.price}</p>
                  <IoIosColorPalette />
                  <p id="color">{product.color}</p>
                </span>
                <button
                  className="btn-card"
                  onClick={() => handleAddToCart(product)}>
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
