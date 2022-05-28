import { getProducts, reset } from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/users/cartSlice";
import { useEffect } from "react";
import Spinner from "../utils/Spinner";
import ProductList from "./ProductList";
import ProductSideMenu from "./ProductSideMenu";
import { createOrder } from "../../redux/features/orders/orderSlice";

function Products() {
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleAddToCart = (product: object) => {
    dispatch(createOrder());
    dispatch(addToCart(product));
  };

  if (isLoading) return <Spinner />;

  if (!products || products.length <= 0) {
    return <h1 className="no-products">Store Is Under Construction . . .</h1>;
  }

  return (
    <>
      <h1>New Arrivals</h1>
      <section className="product-container">
        <>
          <ProductSideMenu />
          <ProductList addToCart={handleAddToCart} products={products} />
        </>
      </section>
    </>
  );
}

export default Products;
