import {
  getAllProducts,
  reset,
} from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/users/cartSlice";
import { useEffect } from "react";
import Spinner from "../utils/Spinner";
import ProductList from "./ProductList";
import ProductMenu from "./ProductMenu";

function Products() {
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    dispatch(getAllProducts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleAddToCart = (product: object) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1>New Arrivals</h1>
      <section className="product-container">
        <ProductMenu />
        {!products || products.length <= 0 ? (
          <h2 className="no-products">No products were found !</h2>
        ) : (
          <ProductList addToCart={handleAddToCart} products={products} />
        )}
      </section>
    </>
  );
}

export default Products;
