import { useEffect, useRef, useState } from "react";

import Homepage from "./components/Homepage";
import SearchForm from "./components/SearchForm";
import CitiesList from "./components/CitiesList";
import WeatherMainInfos from "./components/WeatherMainInfos";
import WeatherThumbnail from "./components/WeatherThumbnail";
import Loader from "./components/Loader";

import ClearDay from "./assets/bg-imgs/clear-day.webp";
import ClearNight from "./assets/bg-imgs/clear-night.webp";
import CloudsDay from "./assets/bg-imgs/clouds-day.webp";
import CloudsNight from "./assets/bg-imgs/clouds-night.webp";
import MistDay from "./assets/bg-imgs/mist-day.jpg";
import MistNight from "./assets/bg-imgs/mist-night.jpg";
import RainDay from "./assets/bg-imgs/rain-day.webp";
import RainNight from "./assets/bg-imgs/rain-night.jpg";
import SnowDay from "./assets/bg-imgs/snow-day.webp";
import SnowNight from "./assets/bg-imgs/snow-night.webp";
import Thunderstorm from "./assets/bg-imgs/thunderstorm.webp";
import Tornado from "./assets/bg-imgs/tornado.jpg";
import HomepageBg from "./assets/bg-imgs/homepage.webp";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);

  // Preload background images

  useEffect(() => {
    const imgs = [
      ClearDay,
      ClearNight,
      CloudsDay,
      CloudsNight,
      MistDay,
      MistNight,
      RainDay,
      RainNight,
      SnowDay,
      SnowNight,
      Thunderstorm,
      HomepageBg,
    ];

    cacheImages(imgs);
  }, []);

  const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    await Promise.all(promises);
    setIsLoading(false);
  };

  // Fetch the cities with same name from the Geocoding API of OpenWeatherMap and store their latitude and longitude

  useEffect(() => {
    const fetchCities = async function () {
      try {
        const cityResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const cityData = await cityResponse.json();
        setCityData(cityData);
        setShowDropdown(true);
      } catch (error) {
        alert("Error retrieving cities: " + error.message);
      }
    };

    if (cityInput) {
      fetchCities();
    } else {
      setShowDropdown(false);
    }
  }, [cityInput]);

  // Retrieve weather data for the selected city from the Current Weather Data API of OpenWeatherMap

  const fetchWeather = async function (lat, lon) {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
    } catch (error) {
      alert("Error retrieving weather data: " + error.message);
    }
  };

  // Set background-image according to main weather and time (day or night)

  let bgImg;
  if (weatherData.name) {
    if (weatherData.weather[0].main === "Clear") {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = ClearDay)
        : (bgImg = ClearNight);
    } else if (weatherData.weather[0].main === "Clouds") {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = CloudsDay)
        : (bgImg = CloudsNight);
    } else if (
      weatherData.weather[0].main === "Rain" ||
      weatherData.weather[0].main === "Drizzle"
    ) {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = RainDay)
        : (bgImg = RainNight);
    } else if (weatherData.weather[0].main === "Snow") {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = SnowDay)
        : (bgImg = SnowNight);
    } else if (weatherData.weather[0].main === "Thunderstorm") {
      bgImg = Thunderstorm;
    } else if (
      weatherData.weather[0].main === "Tornado" ||
      weatherData.weather[0].main === "Squall"
    ) {
      bgImg = Tornado;
    } else {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = MistDay)
        : (bgImg = MistNight);
    }
  }

  return (
    <div className="w-full h-screen text-white">
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="flex flex-col justify-between items-center h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: weatherData.name
              ? `url(${bgImg})`
              : `url(${HomepageBg})`,
          }}
        >
          <div>
            <SearchForm
              cityInput={cityInput}
              setCityInput={setCityInput}
              inputRef={inputRef}
            />
            {!showDropdown && !weatherData.name && <Homepage />}
            {showDropdown && cityData.length > 0 && (
              <CitiesList
                cityData={cityData}
                setCityInput={setCityInput}
                setCityName={setCityName}
                fetchWeather={fetchWeather}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                inputRef={inputRef}
              />
            )}
            {weatherData.name && (
              <WeatherMainInfos cityName={cityName} weatherData={weatherData} />
            )}
          </div>
          {weatherData.name && <WeatherThumbnail weatherData={weatherData} />}
        </div>
      )}
    </div>
  );
}

export default App;
