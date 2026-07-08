import { useState } from 'react';
import Searchbox from "./Searchbox";
import Infobox from "./Infobox";

export default function Weatherapp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Mumbai",
    temp: 298.05,
    tempMin: 293.00,
    tempMax: 303.00,
    humidity: 60,
    pressure: 1013,
    weather: "haze",
  });

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>Weather App By Om</h2>
      <Searchbox updateInfo={setWeatherInfo} />
      <Infobox info={weatherInfo} />
    </div>
  );
}