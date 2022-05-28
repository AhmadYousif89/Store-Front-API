import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { login, reset } from "../redux/features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Spinner from "../components/utils/Spinner";
import { IoCreateOutline } from "react-icons/io5";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userForm;

  const { user, isLoading } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );

  useEffect(() => {
    if (user) {
      navigate(`/products`);
    }
    emailRef.current?.focus();
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleForm = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
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
              <div className="input-icon">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  ref={emailRef}
                  placeholder="Enter your email"
                  onChange={handleForm}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-icon">
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
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                L O G I N
              </button>
            </div>
          </div>
          <p className="form-link">
            Don't have an account ?
            <Link to="/register" id="form-link">
              REGISTER
              <IoCreateOutline />
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
