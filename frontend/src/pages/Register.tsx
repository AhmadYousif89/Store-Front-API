import { useState, useEffect } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password2: "",
  });
  const { name, password, password2 } = formData;
  const handleForm = (e: { target: { name: string; value: string } }) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>Registration</h1>
        <p>Create new user </p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
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
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              S U B M I T
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
