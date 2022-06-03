import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { update } from "../../../redux/features/users/userSlice";
import Spinner from "../../utils/Spinner";
import { Users } from "../../../types/types";

type Props = {
  user: Users;
  isLoading: boolean;
};

function UpdatePassword({ user, isLoading }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = userForm;

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
      toast.error("your passwords are not matching");
    } else {
      dispatch(update({ password }));
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h3 className="title-change-password">Change password</h3>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-content">
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
                  autoFocus={true}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-icon">
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
            </div>
            <div className="form-group">
              <button onClick={handleSubmit} className="btn btn-block">
                S U B M I T
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdatePassword;
