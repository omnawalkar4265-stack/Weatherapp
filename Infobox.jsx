import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './Infobox.css';

const HAZE_URL    = "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=400";
const HOT_URL     = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=400";
const RAIN_URL    = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=400";
const SNOW_URL    = "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400";
const CLOUD_URL   = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400";
const CLEAR_URL   = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400";
const THUNDER_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400";
const MIST_URL    = "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=400";
const DRIZZLE_URL = "https://images.unsplash.com/photo-1541919329513-35f7af297129?w=400";
const WIND_URL    = "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400";
const DUST_URL    = "https://images.unsplash.com/photo-1590552515252-3a5a1bce7bed?w=400";
const FOG_URL     = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400";
const HUMID_URL   = "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400";

export default function Infobox({ info }) {
  const w = info.weather?.toLowerCase();

  const getImage = () => {
    if (w.includes("thunder"))                       return THUNDER_URL;
    if (w.includes("drizzle"))                       return DRIZZLE_URL;
    if (w.includes("rain") || info.humidity > 80)    return RAIN_URL;
    if (w.includes("snow"))                          return SNOW_URL;
    if (w.includes("mist"))                          return MIST_URL;
    if (w.includes("fog"))                           return FOG_URL;
    if (w.includes("haze"))                          return HAZE_URL;
    if (w.includes("dust"))                          return DUST_URL;
    if (w.includes("wind"))                          return WIND_URL;
    if (w.includes("clear"))                         return CLEAR_URL;
    if (w.includes("cloud"))                         return CLOUD_URL;
    if (info.temp > 310)                             return HOT_URL;
    if (info.humidity > 70)                          return HUMID_URL;
    return HAZE_URL;
  };

  return (
    <div className="infoBox">
      <div className="Infoboxcontainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={getImage()}
            title={info.weather}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <div>Temperature: {info.temp}°C</div>
              <div>Min Temperature: {info.tempMin}°C</div>
              <div>Max Temperature: {info.tempMax}°C</div>
              <div>Weather: {info.weather}</div>
              <div>Humidity: {info.humidity}%</div>
              <div>Pressure: {info.pressure} hPa</div>
              <p>The weather can be described as {info.weather}</p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}