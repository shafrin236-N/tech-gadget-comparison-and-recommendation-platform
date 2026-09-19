import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const url =
        `http://127.0.0.1:8000/auth/login` +
        `?username=${encodeURIComponent(username)}` +
        `&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      setMessage(
        `Login successful! Welcome, ${data.username}.`
      );

      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;