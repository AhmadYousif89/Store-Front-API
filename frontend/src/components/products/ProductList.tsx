import { AiOutlineTag } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { Link } from "react-router-dom";
import { Products } from "../../types/types";
import "./styles/products.css";

type Props = {
  products: [Products];
  addToCart: (product: object) => void;
};

function ProductList({ addToCart, products }: Props) {
  return (
    <section className="products">
      {products.map((product) => {
        const { _id, p_name, brand, price, color, image_url, description } =
          product;
        return (
          <ul className="product-card" key={_id}>
            <div className="card-details">
              <div id="img-card">
                <Link to={`/products/${_id}`}>
                  <img src={image_url} alt={p_name} />
                </Link>
              </div>
              <div className="product-info">
                <p id="brand">{brand?.toUpperCase()}</p>
                <p id="p-name">{p_name}</p>
                <p id="p-desc">{description}</p>
                <div className="price-color">
                  <div className="price-tag">
                    <AiOutlineTag />
                    <span id="price">{price}</span>
                  </div>
                  <div className="color-tag">
                    <IoIosColorPalette />
                    <p id="color">{color}</p>
                  </div>
                </div>
                <button className="btn-card" onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Add to cart
                </button>
              </div>
            </div>
          </ul>
        );
      })}
    </section>
  );
}

export default ProductList;
