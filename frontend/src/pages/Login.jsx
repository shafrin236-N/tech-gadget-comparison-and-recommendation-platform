import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api";


function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");


  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    try {

      const data = await loginUser(form);

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/gadgets");

    } catch (error) {

      setError(error.message);

    }

  }


  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Login</h2>


        <label>
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />


        <label>
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />


        <button
          type="submit"
          className="primary-button"
        >
          Login
        </button>


        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </form>

    </div>
  );
}

export default Login;