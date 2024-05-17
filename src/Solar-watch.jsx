import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SolarWatch() {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const response = await fetch(`api/sun-times/${city}/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSunrise(data.sunrise);
        setSunset(data.sunset);
      } else {
        console.error(await response.text());
        setError("Failed to fetch sunrise and sunset times.");
      }
    } catch (err) {
      console.error("Error fetching sunrise and sunset times:", err);
      setError("An error occurred. Please try again later.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate('/');
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Sunset Horizon</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="content">
        <div className="container">
          <h2>Solar Watch</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="city">City:</label>
            <input
              placeholder={"Londol"}
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button type="submit" className="submit-button">
              Get Sunrise & Sunset
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {sunrise && sunset && (
            <div className="results">
              <p>
                Sunrise: <span>{sunrise} </span>
              </p>
              <p>
                Sunset: <span>{sunset}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Sunset Horizon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SolarWatch;
