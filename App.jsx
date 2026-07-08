import { useState } from 'react';
import Weatherapp from './Weatherapp';
export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null); 
  return (
    <>
      <Weatherapp />
    </>
  );
}