import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegistration(e) {
    e.preventDefault();
    await loginUser();
    navigate(`/`);
  }

  async function loginUser() {
    await fetch("/api/member/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Sunset Horizon</h1>
      </header>
      <div className="content reg-content">
        <div className="container">
          <h2>Registration</h2>
          <form onSubmit={handleRegistration}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="registration-button">
              Registration
            </button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Sunset Horizon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Registration;
