import { AiOutlineTag } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

function ProductList(props: {
  products: any[];
  moveToCart: (arg0: object) => void;
}) {
  return (
    <section className="products">
      {props.products.map((product: any) => (
        <ul className="product-card" key={product.p_id}>
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
            <button
              className="btn-card"
              onClick={() => props.moveToCart(product)}>
              <FaShoppingCart /> Add to cart
            </button>
          </div>
        </ul>
      ))}
    </section>
  );
}

export default ProductList;
