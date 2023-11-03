import { LuSunrise, LuSunset } from "react-icons/lu";
import {
  ImArrowLeft,
  ImArrowRight,
  ImArrowUp,
  ImArrowDown,
  ImArrowDownLeft,
  ImArrowDownRight,
  ImArrowUpLeft,
  ImArrowUpRight,
} from "react-icons/im";

const WeatherThumbnail = ({ weatherData }) => {
  const windDirTab = [
    <ImArrowDown key="N" />,
    <ImArrowDownLeft key="NE" />,
    <ImArrowLeft key="E" />,
    <ImArrowUpLeft key="SE" />,
    <ImArrowUp key="S" />,
    <ImArrowUpRight key="SW" />,
    <ImArrowRight key="W" />,
    <ImArrowDownRight key="NW" />,
    <ImArrowDown key="N2" />,
  ];

  // Local sunrise and sunset times

  let sunriseTime;
  let sunsetTime;
  if (weatherData.name) {
    const timezoneJS = weatherData.timezone * 1000;
    const sunriseJS = weatherData.sys.sunrise * 1000;
    const sunsetJS = weatherData.sys.sunset * 1000;

    let sunriseHours = new Date(sunriseJS + timezoneJS).getUTCHours();
    sunriseHours < 10 ? (sunriseHours = `0${sunriseHours}`) : sunriseHours;
    let sunriseMinutes = new Date(sunriseJS + timezoneJS).getUTCMinutes();
    sunriseMinutes < 10
      ? (sunriseMinutes = `0${sunriseMinutes}`)
      : sunriseMinutes;
    sunriseTime = `${sunriseHours} : ${sunriseMinutes}`;

    let sunsetHours = new Date(sunsetJS + timezoneJS).getUTCHours();
    sunsetHours < 10 ? (sunsetHours = `0${sunsetHours}`) : sunsetHours;
    let sunsetMinutes = new Date(sunsetJS + timezoneJS).getUTCMinutes();
    sunsetMinutes < 10 ? (sunsetMinutes = `0${sunsetMinutes}`) : sunsetMinutes;
    sunsetTime = `${sunsetHours} : ${sunsetMinutes}`;
  }

  return (
    <div className="flex w-[90%] max-w-[500px] justify-between mb-5 px-3 pt-2 pb-3 bg-gray-900/40 rounded-md">
      <div className="flex flex-col w-fit">
        <p className="text-center mb-2 font-bold">Sun</p>
        <div>
          <p className="flex items-center">
            <LuSunrise className="mr-3" /> {sunriseTime}
          </p>
          <p className="flex items-center">
            <LuSunset className="mr-3" /> {sunsetTime}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-fit">
        <p className="mb-2 font-bold">Wind</p>
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <p className="mr-2">
              {windDirTab[Math.round((weatherData.wind.deg % 360) / 45)]}
            </p>
            <p>{Math.round((weatherData.wind.speed * 3600) / 1000)} km/h</p>
          </div>
          {weatherData.wind.gust && (
            <p className="w-full text-center px-1 bg-red-500 rounded-md">
              {Math.round((weatherData.wind.gust * 3600) / 1000)} km/h
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-2 font-bold">Humidity</p>
        <p>{weatherData.main.humidity}%</p>
      </div>
    </div>
  );
};

export default WeatherThumbnail;
