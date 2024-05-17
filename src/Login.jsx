import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  async function handleLogin(e) {
    e.preventDefault();
    const response = await loginUser();
    
    if (!response.ok) {
      localStorage.removeItem("jwt");
      setError("Incorrect username or password");
      throw new Error("Incorrect username or password");
    }
    
    const responseBody = await response.json();
    localStorage.setItem("jwt", JSON.stringify(responseBody.jwt));
    navigate(`/solar-watch`);
  }
  
  async function loginUser() {
    const response = await fetch("/api/member/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    return response;
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Sunset Horizon</h1>
      </header>
      <div className="content login-content">
        <div className="container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
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

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <button
            className="register-button"
            onClick={() => navigate("/registration")}
          >
            Register
          </button>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Sunset Horizon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
