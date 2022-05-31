import { Link } from "react-router-dom";
import "./styles/home.css";

function Home() {
  return (
    <div className="home">
      <h3>TechStore</h3>
      <h1>Online Shop</h1>
      <div className="home-content">
        <p>Shop for the latest mobile and electronics devices.</p>
        <Link to="/products">
          <button>START SHOPPING</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
