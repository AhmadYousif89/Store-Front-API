import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getProducts } from "../redux/features/products/productSlice";
import ProductItems from "../components/ProductItems";
import "./styles/Products.css";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Access denied");
    }
    if (isError) toast.error(message);
    dispatch(getProducts());
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h3>
          Welcome <span>{user ? user.data.name.toUpperCase() : null}</span>
        </h3>
        <h1>New Arrivals</h1>
      </section>
      <section className="products">
        <ProductItems products={products} />
      </section>
    </>
  );
}

export default Dashboard;
