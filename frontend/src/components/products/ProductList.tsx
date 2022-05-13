import { AiOutlineTag } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { Link } from "react-router-dom";

type Props = {
  products: [Product];
  addToCart: (arg: object) => void;
};
type Product = {
  p_id: string;
  p_name: string;
  brand: string;
  price: number;
  color: string;
  image_url: string;
  description: string;
};

function ProductList({ addToCart, products }: Props) {
  const showProducts = products.map((product) => {
    const { p_id, p_name, brand, price, color, image_url, description } =
      product;
    return (
      <ul className="product-card" key={p_id}>
        <div className="card-details">
          <div id="img-card">
            <Link to={`/products/${p_id}`}>
              <img src={image_url} alt={p_name} />
            </Link>
          </div>
          <div>
            <p id="brand">{brand.toUpperCase()}</p>
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
  });

  return <section className="products">{showProducts}</section>;
}

export default ProductList;
