import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../redux/features/users/cartSlice";
import "./styles/checkoutSuccess.css";

function CheckoutSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <section className="checkout-success-card">
      <div className="success">
        <h1>Successfull Payment</h1>
        <BsBagCheckFill />
        <h2>Thank you for your purchase.</h2>
        <h5>Check your email inbox for the receipt.</h5>
        <p className="email-msg">
          For any questions, please
          <br /> <span>Email : </span>
          <a href="mailto:ayob.4wrk89@gmail.com"> ayob.4wrk89@gmail.com</a>
        </p>
      </div>
      <Link to="/products">
        <button className="success-btn">Continue Shopping</button>
      </Link>
    </section>
  );
}

export default CheckoutSuccess;
