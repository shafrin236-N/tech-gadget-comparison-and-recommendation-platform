import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api";


function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  }


  async function handleSubmit(event) {

    event.preventDefault();

    setMessage("");
    setError("");

    try {

      await registerUser(form);

      setMessage(
        "Registration successful. You can now login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

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

        <h2>Create Account</h2>


        <label>
          Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />


        <label>
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
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
          placeholder="Create password"
          required
        />


        <button
          type="submit"
          className="primary-button"
        >
          Register
        </button>


        {message && (
          <p className="success">
            {message}
          </p>
        )}


        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </form>

    </div>
  );
}

export default Register;