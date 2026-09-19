import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const url =
        `http://127.0.0.1:8000/auth/register` +
        `?username=${encodeURIComponent(username)}` +
        `&email=${encodeURIComponent(email)}` +
        `&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setMessage(
        `Registration successful! Welcome, ${data.username}.`
      );

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>

        <div>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit">
          Register
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}
    </div>
  );
}

export default Register;