import { addToCart, stripCheckout } from "../../redux/features/users/cartSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FaShopify, FaShoppingCart } from "react-icons/fa";
import { AiOutlineTag } from "react-icons/ai";
import { Products } from "../../types/types";
import { Link } from "react-router-dom";
import "./styles/products.css";
import { MdInvertColors } from "react-icons/md";

type Props = {
  products: [Products];
};

function ProductList({ products }: Props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootStateOrAny) => state.cart);

  return (
    <section className="products">
      {products.map((product) => {
        const { _id, name, brand, price, color, image, description } = product;
        return (
          <ul className="product-card" key={_id}>
            <div className="card-details">
              <div className="img-card">
                <Link to={`/products/${_id}`}>
                  <img src={image} alt={name} />
                </Link>
              </div>
              <div className="product-info">
                <p id="brand">{brand?.toUpperCase()}</p>
                <p id="p-name">{name}</p>
                <p id="p-desc">{description}</p>
                <div className="price-color">
                  <div className="price-tag">
                    <AiOutlineTag />
                    <span id="price">{price}</span>
                  </div>
                  <div className="color-tag">
                    <p id="color">Color</p>
                    <MdInvertColors
                      style={{ color: color ? color : "black" }}
                    />
                  </div>
                </div>
                <div className="shop-btn">
                  <button
                    className="btn-card"
                    onClick={() => dispatch(addToCart(product))}>
                    <FaShoppingCart /> Add to cart
                  </button>
                  <button
                    className="btn-card"
                    onClick={() => {
                      dispatch(addToCart(product));
                      setTimeout(() => {
                        dispatch(stripCheckout({ cart }));
                      }, 1000);
                    }}>
                    <FaShopify /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </ul>
        );
      })}
    </section>
  );
}

export default ProductList;
