import { getProduct } from "../../redux/features/products/productSlice";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { GiPriceTag } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { Products } from "../../types/types";
import Spinner from "../utils/Spinner";
import { useEffect } from "react";
import "./styles/singleProduct.css";

function SingleProduct() {
  const dispatch = useDispatch();
  const { productID } = useParams();

  const { products, isLoading } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    dispatch(getProduct(productID as string));
  }, [dispatch, productID]);

  if (isLoading) return <Spinner />;

  if (!products || products.length <= 0)
    return <h1>No Product Found . . . </h1>;

  return (
    <section>
      <div className="heading">
        <h2>Product Details</h2>
      </div>
      <section className="single-product">
        {products?.map((product: Products) => {
          const { _id, name, brand, price, color, image, description } =
            product;
          return (
            <ul className="single-product-card" key={_id}>
              <div className="img-card">
                <img src={image} alt={name} />
              </div>
              <div className="product-details">
                <p className="brand">{brand?.toUpperCase()}</p>
                <p className="name">{name}</p>
                <p className="specs">
                  <span>Specs</span>
                  <span>{description}</span>
                </p>
                <div className="price-color-container">
                  <div className="price-tag">
                    <GiPriceTag />
                    <span>{price}</span>
                  </div>
                  <div className="color-tag">
                    <span>Color</span> <span>{color}</span>
                  </div>
                </div>
              </div>
            </ul>
          );
        })}
      </section>
      <Link className="go_back" to="/products">
        <HiArrowNarrowLeft /> Back to products
      </Link>
    </section>
  );
}

export default SingleProduct;
