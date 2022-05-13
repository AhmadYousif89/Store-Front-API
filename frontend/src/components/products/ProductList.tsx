import { AiOutlineTag } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { Link } from "react-router-dom";

function ProductList(props: {
  products: any[];
  moveToCart: (arg0: object) => void;
}) {
  const { products, moveToCart } = props;

  const showProducts = products.map((product: any) => (
    <ul className="product-card" key={product.p_id}>
      <div id="img-card">
        <Link to={`/products/${product.p_id}`}>
          <img src={product.image_url} alt={product.p_name} />
        </Link>
      </div>
      <div className="card_details">
        <p id="brand">{product.brand.toUpperCase()}</p>
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
        <button className="btn-card" onClick={() => moveToCart(product)}>
          <FaShoppingCart /> Add to cart
        </button>
      </div>
    </ul>
  ));

  return <section className="products">{showProducts}</section>;
}

export default ProductList;
