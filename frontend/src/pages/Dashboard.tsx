import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderForm from "../components/dashboard/OrderForm";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getProducts } from "../features/products/productSlice";
import ProductItems from "../components/dashboard/ProductItems";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootStateOrAny) => state.auth);
  const { products, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.products,
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Access denied");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    dispatch(getProducts());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h3>
          Welcome <span>{user ? user.data.name.toUpperCase() : null}</span>
        </h3>
        <h1>New Arrivals</h1>
      </section>
      <div className="grid product_container">
        <div className="sidebar">
          <OrderForm />
        </div>
        <div className="content">
          <section className="grid products">
            <ProductItems products={products} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
