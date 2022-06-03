import {
  getAllProducts,
  reset,
} from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
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

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1>New Arrivals</h1>
      <section className="product-container">
        <ProductMenu />
        {!products || products.length <= 0 ? (
          <h2 className="no-products">No products were found !</h2>
        ) : (
          <ProductList products={products} />
        )}
      </section>
    </>
  );
}

export default Products;
