import { useState } from "react";
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
  // Probleme de chargement des données au clic ************************************************
  // Voir changement de couleur du texte en fonction des image *******************************
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [geoLocation, setGeoLocation] = useState({});
  const [data, setData] = useState([]);
  // Ajouter les quatre manquants et changer les flèches *******************************************
  // voir convert wind degrees to direction Campbell Scientific **************************************
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
  const week = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const month = [
    "janv",
    "fev",
    "mars",
    "avril",
    "mai",
    "juin",
    "juil",
    "août",
    "sept",
    "oct",
    "nov",
    "déc",
  ];

  const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${
    geoLocation.lat
  }&lon=${geoLocation.lon}&appid=${import.meta.env.VITE_API_KEY}&lang=fr`;

  async function SearchWeather() {
    const cityResponse = await fetch(urlCity);
    const cityData = await cityResponse.json();
    setGeoLocation({
      lon: cityData[0].lon,
      lat: cityData[0].lat,
    });
    setCountry(cityData[0].country);
    const weatherResponse = await fetch(urlWeather);
    const weatherData = await weatherResponse.json();
    setData(weatherData);
    console.log(data);
  }

  let day = new Date().getDate();
  day < 10 ? (day = `0${day}`) : day;
  let hour = new Date().getHours();
  hour < 10 ? (hour = `0${hour}`) : hour;
  let minute = new Date().getMinutes();
  minute < 10 ? (minute = `0${minute}`) : minute;
  const now = `${week[new Date().getDay()]} ${day} ${
    month[new Date().getMonth()]
  } - ${hour} : ${minute}`;

  let sunriseTime;
  let sunsetTime;
  const time = Math.floor(new Date().getTime() / 1000);
  let bgImg;
  if (data.name) {
    let sunriseHour = new Date(data.sys.sunrise * 1000).getHours();
    sunriseHour < 10 ? (sunriseHour = `0${sunriseHour}`) : sunriseHour;
    let sunriseMinute = new Date(data.sys.sunrise * 1000).getMinutes();
    sunriseMinute < 10 ? (sunriseMinute = `0${sunriseMinute}`) : sunriseMinute;
    sunriseTime = `${sunriseHour} : ${sunriseMinute}`;

    let sunsetHour = new Date(data.sys.sunset * 1000).getHours();
    sunsetHour < 10 ? (sunsetHour = `0${sunsetHour}`) : sunsetHour;
    let sunsetMinute = new Date(data.sys.sunset * 1000).getMinutes();
    sunsetMinute < 10 ? (sunsetMinute = `0${sunsetMinute}`) : sunsetMinute;
    sunsetTime = `${sunsetHour} : ${sunsetMinute}`;

    if (data.weather[0].main === "Clear") {
      time > data.sys.sunset ? (bgImg = ClearNight) : (bgImg = ClearDay);
    } else if (data.weather[0].main === "Clouds") {
      time > data.sys.sunset
        ? (bgImg = bgImg = CloudsNight)
        : (bgImg = CloudsDay);
    } else if (data.weather[0].main === "Drizzle") {
      time > data.sys.sunset
        ? (bgImg = bgImg = DrizzleNight)
        : (bgImg = DrizzleDay);
    } else if (data.weather[0].main === "Rain") {
      time > data.sys.sunset ? (bgImg = bgImg = RainNight) : (bgImg = RainDay);
    } else if (data.weather[0].main === "Snow") {
      time > data.sys.sunset ? (bgImg = bgImg = SnowNight) : (bgImg = SnowDay);
    } else if (data.weather[0].main === "Thunderstorm") {
      time > data.sys.sunset
        ? (bgImg = bgImg = ThunderstormNight)
        : (bgImg = ThunderstormDay);
    } else {
      time > data.sys.sunset ? (bgImg = MistNight) : (bgImg = MistDay);
    }
  }

  return (
    <div className="w-full h-screen text-white">
      <div
        className="flex flex-col justify-between items-center h-full bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: data.name ? `url(${bgImg})` : `url(${HomepageBg})`,
        }}
      >
        <div className="flex flex-col items-center pt-5">
          <input
            type="text"
            placeholder="Entrez une ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="py-3 pl-5 mb-3 text-black rounded-[50px]"
          />
          <button
            onClick={SearchWeather}
            className="w-fit px-3 py-2 border-2 border-white rounded-[50px]"
          >
            Rechercher
          </button>
          {data.name && (
            <div className="flex flex-col items-center mt-10">
              <p className="text-3xl">
                {data.name}, {country}
              </p>
              <p>{now}</p>
              <p className="text-7xl lg:text-8xl mt-20 mb-2">
                {Math.round(data.main.temp)} °C
              </p>
              <p className="mb-3">
                ( Ressenti: {Math.round(data.main.feels_like)} °C )
              </p>
              <div className="flex text-2xl mb-10">
                <p>Max {Math.floor(data.main.temp_max)} °C&nbsp;&nbsp;/</p>
                <p>&nbsp;&nbsp; Min {Math.floor(data.main.temp_min)} °C</p>
              </div>
              {/* A voir css quand plusieurs descriptions*****************************************/}
              <p className="text-3xl">
                {data.weather.map((item) => (
                  <p key={item.description}>
                    {item.description.charAt(0).toUpperCase() +
                      item.description.slice(1)}
                  </p>
                ))}
              </p>
            </div>
          )}
        </div>

        {data.name && (
          <div className="flex w-[90%] max-w-[500px] justify-between mb-5 px-3 pt-2 pb-3 bg-gray-300/20 rounded-md">
            <div className="flex flex-col w-fit">
              <p className="text-center mb-2 font-bold">Soleil</p>
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
              <p className="text-center mb-2 font-bold">Vent</p>
              <div>
                <div className="flex items-center">
                  <p className="mr-2">
                    {windDirTab[Math.round((data.wind.deg % 360) / 45)]}
                  </p>
                  <p>{Math.round((data.wind.speed * 3600) / 1000)} km/h</p>
                </div>
                {data.wind.gust && (
                  <p className="text-center bg-red-500 rounded-[25px]">
                    {Math.round((data.wind.gust * 3600) / 1000)} km/h
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-2 font-bold">Humidité</p>
              <p>{data.main.humidity}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
