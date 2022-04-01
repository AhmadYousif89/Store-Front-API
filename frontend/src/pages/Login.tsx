import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { login, reset } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
    if (isSuccess) {
      toast.success(message);
      navigate("/dashboard");
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
      <section className="heading">
        <h1>TechStore</h1>
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
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
        </form>
      </section>
      <Link to="/register" className="registe">
        create new account ?
      </Link>
    </>
  );
}

export default Login;
