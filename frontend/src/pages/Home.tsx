import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  return (
    <div className="home">
      <h3>TechStore</h3>
      <h1>Online Shop</h1>
      <div className="home-content">
        <p>Shop for the latest mobile and electronics devices.</p>
        <button>
          <Link to="/products">START SHOPPING</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
