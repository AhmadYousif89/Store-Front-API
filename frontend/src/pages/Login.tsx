import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { login, reset } from "../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/utils/Spinner";
import { toast } from "react-toastify";
import { IoCreateOutline } from "react-icons/io5";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user) {
      if (isSuccess) toast.success(message);
      navigate(`/products`);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleForm = (e: { target: { name: string; value: string } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="heading">
        <h1>TechStore</h1>
        <p>Login to your account</p>
      </div>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={handleForm}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                L O G I N
              </button>
            </div>
          </div>
          <p className="form-link">
            Don't have an account ?{" "}
            <Link to="/register" id="form-link">
              REGISTER <IoCreateOutline />
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
