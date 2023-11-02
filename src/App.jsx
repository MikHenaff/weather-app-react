import { useEffect, useState } from "react";
import { LuSunrise, LuSunset } from "react-icons/lu";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowUpBold,
  PiArrowDownBold,
  PiArrowDownLeftBold,
  PiArrowDownRightBold,
  PiArrowUpLeftBold,
  PiArrowUpRightBold,
} from "react-icons/pi";
import ClearDay from "./assets/clear-day.jpg";
import ClearNight from "./assets/clear-night.jpg";
import CloudsDay from "./assets/clouds-day.jpg";
import CloudsNight from "./assets/clouds-night.jpg";
import DrizzleDay from "./assets/drizzle-day.jpg";
import DrizzleNight from "./assets/drizzle-night.jpg";
import MistDay from "./assets/mist-day.jpg";
import MistNight from "./assets/mist-night.jpg";
import RainDay from "./assets/rain-day.jpg";
import RainNight from "./assets/rain-night.jpg";
import SnowDay from "./assets/snow-day.jpg";
import SnowNight from "./assets/snow-night.jpg";
import ThunderstormDay from "./assets/thunderstorm-day.jpg";
import ThunderstormNight from "./assets/thunderstorm-night.jpg";
import HomepageBg from "./assets/homepage-bg.jpg";

function App() {
  // Changer heures lever coucher en fonction de la timezone *********************************
  // Ajouter les quatre manquants et changer les flèches *******************************************
  // voir convert wind degrees to direction Campbell Scientific **************************************
  // Commenter ************************************************************************************
  // refactoriser => components  ***************************************************************

  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [visibleItem, setVisibleItem] = useState(false);

  const windDirTab = [
    <PiArrowDownBold key="N" />,
    <PiArrowDownLeftBold key="NE" />,
    <PiArrowLeftBold key="E" />,
    <PiArrowUpLeftBold key="SE" />,
    <PiArrowUpBold key="S" />,
    <PiArrowUpRightBold key="SW" />,
    <PiArrowRightBold key="W" />,
    <PiArrowDownRightBold key="NW" />,
    <PiArrowDownBold key="N2" />,
  ];
  const weekTab = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthTab = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (city === "") setVisibleItem(false);
  }, [city]);

  const searchCity = async function () {
    if (city !== "") {
      const cityResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const cityData = await cityResponse.json();
      setCityData(cityData);
      setVisibleItem(true);
      if (cityData.length === 0)
        alert("This city is not available. Please try a valid city.");
      console.log(cityData);
    } else {
      alert("Please enter a city.");
    }
  };

  const searchWeather = async function (lat, lon) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const weatherData = await weatherResponse.json();
    setWeatherData(weatherData);
    console.log(weatherData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCity();
  };

  const weekDay = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getDay();
  let day = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getDate();
  day < 10 ? (day = `0${day}`) : day;
  const month = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getMonth();
  const year = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getFullYear();
  let hours = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getUTCHours();
  hours < 10 ? (hours = `0${hours}`) : hours;
  let minutes = new Date(
    Math.round(Date.now() + weatherData.timezone * 1000)
  ).getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  const now = `${weekTab[weekDay]}, ${day} ${monthTab[month]} ${year} ${hours}:${minutes}`;

  let sunriseTime;
  let sunsetTime;
  let bgImg;
  const time = Math.floor(new Date().getTime() / 1000);
  if (weatherData.name) {
    let sunriseHour = new Date(weatherData.sys.sunrise * 1000).getHours();
    sunriseHour < 10 ? (sunriseHour = `0${sunriseHour}`) : sunriseHour;
    let sunriseMinute = new Date(weatherData.sys.sunrise * 1000).getMinutes();
    sunriseMinute < 10 ? (sunriseMinute = `0${sunriseMinute}`) : sunriseMinute;
    sunriseTime = `${sunriseHour} : ${sunriseMinute}`;

    let sunsetHour = new Date(weatherData.sys.sunset * 1000).getHours();
    sunsetHour < 10 ? (sunsetHour = `0${sunsetHour}`) : sunsetHour;
    let sunsetMinute = new Date(weatherData.sys.sunset * 1000).getMinutes();
    sunsetMinute < 10 ? (sunsetMinute = `0${sunsetMinute}`) : sunsetMinute;
    sunsetTime = `${sunsetHour} : ${sunsetMinute}`;

    if (weatherData.weather[0].main === "Clear") {
      time > weatherData.sys.sunset ? (bgImg = ClearNight) : (bgImg = ClearDay);
    } else if (weatherData.weather[0].main === "Clouds") {
      time > weatherData.sys.sunset
        ? (bgImg = bgImg = CloudsNight)
        : (bgImg = CloudsDay);
    } else if (weatherData.weather[0].main === "Drizzle") {
      time > weatherData.sys.sunset
        ? (bgImg = bgImg = DrizzleNight)
        : (bgImg = DrizzleDay);
    } else if (weatherData.weather[0].main === "Rain") {
      time > weatherData.sys.sunset
        ? (bgImg = bgImg = RainNight)
        : (bgImg = RainDay);
    } else if (weatherData.weather[0].main === "Snow") {
      time > weatherData.sys.sunset
        ? (bgImg = bgImg = SnowNight)
        : (bgImg = SnowDay);
    } else if (weatherData.weather[0].main === "Thunderstorm") {
      time > weatherData.sys.sunset
        ? (bgImg = bgImg = ThunderstormNight)
        : (bgImg = ThunderstormDay);
    } else {
      time > weatherData.sys.sunset ? (bgImg = MistNight) : (bgImg = MistDay);
    }
  }

  return (
    <div className="w-full h-screen text-white">
      <div
        className="flex flex-col justify-between items-center h-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: weatherData.name
            ? `url(${bgImg})`
            : `url(${HomepageBg})`,
        }}
      >
        <div>
          <form onSubmit={handleSubmit} className="flex justfy-center pt-5">
            <input
              type="text"
              placeholder="Enter a city..."
              autoFocus
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="py-3 pl-5 outline-none text-black rounded-md"
              style={{
                boxShadow: "1px 1px 1px black, -1px -1px 1px black",
              }}
            />
            <button
              type="submit"
              onClick={searchCity}
              className="w-fit px-2 ml-2 text-xl border border-white bg-white/20 rounded-md"
              style={{
                textShadow: "1px 1px 1px black, -1px -1px 1px black",
                boxShadow: "1px 1px 1px black, -1px -1px 1px black",
              }}
            >
              🔍
            </button>
          </form>

          {visibleItem && cityData.length > 0 && (
            <ul
              className="w-full mt-1 text-center bg-white text-black border rounded-md"
              style={{
                boxShadow: "1px 1px 1px black, -1px -1px 1px black",
              }}
            >
              {cityData.map((city, index) => (
                <li
                  key={`${city.country}-${index}`}
                  onClick={() => {
                    searchWeather(city.lat, city.lon);
                    setCity("");
                    setVisibleItem(!visibleItem);
                  }}
                  className="py-3 border-b last:border-0 cursor-pointer hover:bg-gray-300/30"
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}

          {weatherData.name && (
            <div
              className="flex flex-col items-center mt-10"
              style={{ textShadow: "1px 1px 2px black, -1px -1px 2px black" }}
            >
              <p className="text-3xl">
                {weatherData.name}, {weatherData.sys.country}
              </p>
              <p>{now}</p>
              <p className="text-7xl lg:text-8xl mt-20 mb-2">
                {Math.round(weatherData.main.temp)} °C
              </p>
              <p className="mb-3">
                ( Feels like: {Math.round(weatherData.main.feels_like)} °C )
              </p>
              <div className="flex text-2xl mb-10">
                <p>
                  Max {Math.floor(weatherData.main.temp_max)} °C&nbsp;&nbsp;/
                </p>
                <p>
                  &nbsp;&nbsp; Min {Math.floor(weatherData.main.temp_min)} °C
                </p>
              </div>
              <div className="text-3xl text-center">
                {weatherData.weather.map((item) => (
                  <p key={item.description}>
                    {item.description.charAt(0).toUpperCase() +
                      item.description.slice(1)}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {weatherData.name && (
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
            <div className="flex flex-col w-fit">
              <p className="text-center mb-2 font-bold">Wind</p>
              <div>
                <div className="flex items-center">
                  <p className="mr-2">
                    {windDirTab[Math.round((weatherData.wind.deg % 360) / 45)]}
                  </p>
                  <p>
                    {Math.round((weatherData.wind.speed * 3600) / 1000)} km/h
                  </p>
                </div>
                {weatherData.wind.gust && (
                  <p className="text-center bg-red-500 rounded-md">
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
        )}
      </div>
    </div>
  );
}

export default App;
