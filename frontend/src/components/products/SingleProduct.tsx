import { getProduct, reset } from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Spinner from "../utils/Spinner";

function SingleProduct() {
  const dispatch = useDispatch();
  const { productID } = useParams();

  const { products, isLoading, isError } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    dispatch(getProduct(productID as string));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, productID]);

  type Product = {
    p_id: string;
    p_name: string;
    brand: string;
    price: number;
    color: string;
    image_url: string;
    description: string;
  };

  const showProduct = products?.map((product: Product) => {
    const { p_id, p_name, brand, price, color, image_url, description } =
      product;
    return (
      <ul className="card-details" key={p_id}>
        <div id="img-card">
          <img src={image_url} alt={p_name} />
        </div>
        <div>
          <p id="brand">{brand.toUpperCase()}</p>
          <p id="p-name">{p_name}</p>
          <div className="price-color">
            <div className="price-tag">
              <span>Price</span> <span id="price">{price}</span>
            </div>
            <div className="color-tag">
              <span>Color</span> <p id="color">{color}</p>
            </div>
            <p id="p-desc">
              <div>General description</div>
              <span>{description}</span>
            </p>
          </div>
        </div>
      </ul>
    );
  });

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="heading">
        <h2>Product Details</h2>
      </div>

      {isError ? (
        <p>No Product Found...</p>
      ) : (
        <section className="products">{showProduct}</section>
      )}

      <Link className="go_back" to="/products">
        <HiArrowNarrowLeft /> Back to products
      </Link>
    </section>
  );
}

export default SingleProduct;
