import { getProduct, reset } from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoIosColorPalette } from "react-icons/io";
import Spinner from "../utils/Spinner";

function SingleProduct() {
  const dispatch = useDispatch();
  const { productID } = useParams();

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  const showProduct = products?.map((product: any) => (
    <ul className="card-details" key={product.p_id}>
      <div id="img-card">
        <img src={product.image_url} alt={product.p_name} />
      </div>
      <div className="card_details">
        <p id="brand">{product.brand}</p>
        <h5>{product.p_name}</h5>
        <p>{product.description}</p>
        <span className="price-tag">
          <span>
            <AiOutlineTag />
          </span>
          <p id="price">{product.price}</p>
          <IoIosColorPalette />
          <p id="color">{product.color}</p>
        </span>
      </div>
    </ul>
  ));

  useEffect(() => {
    dispatch(getProduct(productID as string));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, productID]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="heading">
        <h2>Product Details</h2>
      </div>
      <section className="products">{showProduct}</section>
      <Link className="go_back" to="/products">
        <HiArrowNarrowLeft /> Back to products
      </Link>
    </div>
  );
}

export default SingleProduct;
