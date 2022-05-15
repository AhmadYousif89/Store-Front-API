import { reset, register } from "../redux/features/users/userSlice";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/utils/Spinner";
import { IoPersonCircleOutline } from "react-icons/io5";

function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showErr, setShowErr] = useState(false);

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setShowErr(true);
    }
    if (user) {
      if (isSuccess) toast.success(message);
      navigate(`/products`);
    }
    nameRef.current?.focus();
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleForm = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password does not match !");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(register(user));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Create new account </h1>
        <p>FREE REGISTERATION</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <div className="input-icon">
                {showErr && <span className="show-err">*</span>}
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  ref={nameRef}
                  placeholder="Enter your name"
                  onChange={handleForm}
                />
              </div>
              {showErr && !name && <p className="show-err">required</p>}
            </div>
            <div className="form-group">
              <div className="input-icon">
                {showErr && <span className="show-err">*</span>}
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
              {showErr && !email && <p className="show-err">required</p>}
            </div>
            <div className="form-group">
              <div className="input-icon">
                {showErr && <span className="show-err">*</span>}
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
              {showErr && !password && <p className="show-err">required</p>}
            </div>
            <div className="form-group">
              <div className="input-icon">
                {showErr && <span className="show-err">*</span>}
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm password"
                  onChange={handleForm}
                />
              </div>
              {showErr && !password2 && <p className="show-err">required</p>}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                S U B M I T
              </button>
            </div>
          </div>
          <p className="form-link">
            Already have an account ?{" "}
            <Link to="/login" id="form-link">
              LOGIN <IoPersonCircleOutline />
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
