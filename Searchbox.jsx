import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Searchbox({ updateInfo }) {
  const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const API_KEY = "e949d398e194bf050066afe7bca739d8";

  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const getWeatherInfo = async () => {
    try {
      // 1. Current weather (temp, humidity, pressure, description)
      let response = await fetch(`${CURRENT_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        setError(true);
        return null;
      }

      // 2. Forecast (to calculate today's real min/max temp)
      let forecastResponse = await fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let forecastJson = await forecastResponse.json();

      let tempMin = jsonResponse.main.temp_min;
      let tempMax = jsonResponse.main.temp_max;

      if (forecastJson.cod === "200") {
        const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
        const todaysEntries = forecastJson.list.filter((entry) =>
          entry.dt_txt.startsWith(today)
        );

        if (todaysEntries.length > 0) {
          const temps = todaysEntries.map((entry) => entry.main.temp);
          tempMin = Math.min(...temps);
          tempMax = Math.max(...temps);
        }
      }

      setError(false);
      return {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: tempMin,
        tempMax: tempMax,
        humidity: jsonResponse.main.humidity,
        pressure: jsonResponse.main.pressure,
        weather: jsonResponse.weather[0].description,
      };
    } catch (err) {
      setError(true);
      return null;
    }
  };

  const handleChange = (event) => setCity(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = await getWeatherInfo();
    if (newInfo) {
      updateInfo(newInfo);
      setCity("");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Search for the weather</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /><br />
        <Button variant="contained" type="submit">Search</Button>
      </form>
      {error && <p style={{ color: "red" }}>City not found. Please try again.</p>}
    </div>
  );
}