import { reset, register } from "../redux/features/users/userSlice";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/utils/Spinner";
import { IoPersonCircleOutline } from "react-icons/io5";

function Register() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = userForm;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );

  useEffect(() => {
    if (user) {
      navigate(`/products`);
    }
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
    if (password !== password2) {
      toast.error("password not matching");
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
      <div className="heading">
        <h1>Create new account </h1>
        <p>FREE REGISTERATION</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              autoFocus={true}
              placeholder="Enter your name"
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={handleForm}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              S U B M I T
            </button>
          </div>
          <p className="form-link">
            Already have an account ?
            <Link to="/login" id="form-link">
              LOGIN <IoPersonCircleOutline />
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;
