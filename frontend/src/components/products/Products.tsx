import "./styles/Products.css";
import { getProducts, reset } from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/users/cartSlice";
import { useEffect } from "react";
import Spinner from "../utils/Spinner";
import ProductList from "./ProductList";
import ProductSideMenu from "./ProductSideMenu";

function Products() {
  const dispatch = useDispatch();

  const { products, isLoading, isError } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect((): any => {
    dispatch(getProducts());
    return () => dispatch(reset());
  }, [dispatch]);

  const handleAddToCart = (product: object) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1>New Arrivals</h1>
      <section className="product-container">
        {isError ? (
          <p className="no-products">Store Is Under Construction , Sorry.</p>
        ) : (
          <>
            <ProductSideMenu />
            <ProductList addToCart={handleAddToCart} products={products} />
          </>
        )}
      </section>
    </>
  );
}

export default Products;
