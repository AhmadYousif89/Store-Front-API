import { useState, useEffect } from "react";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formData;
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
        <h1>User Login</h1>
        <p></p>
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
            <button type="submit" className="btn btn-block">
              E N T E R
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
