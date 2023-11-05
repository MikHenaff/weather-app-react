import { useEffect, useState } from "react";

import Homepage from "./components/Homepage";
import SearchForm from "./components/SearchForm";
import CitiesList from "./components/CitiesList";
import WeatherMainInfos from "./components/WeatherMainInfos";
import WeatherThumbnail from "./components/WeatherThumbnail";

import ClearDay from "./assets/bg-imgs/clear-day.jpg";
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
import HomepageBg from "./assets/bg-imgs/homepage.webp";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [visibleItem, setVisibleItem] = useState(false);

  //// Hide the list of cities by clearing the input field after enabling city search and display

  useEffect(() => {
    if (cityInput === "") setVisibleItem(false);
  }, [cityInput]);

  // Search for cities from the Geocoding API of OpenWeatherMap

  const searchCity = async function () {
    if (cityInput !== "") {
      const cityResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const cityData = await cityResponse.json();
      setCityData(cityData);
      setVisibleItem(true);
      if (cityData.length === 0)
        alert("This city is not available. Please try a valid city.");
    } else {
      alert("Please enter a city.");
    }
  };
  // Retrieve weather data for the selected city from the Current Weather Data API of OpenWeatherMap

  const searchWeather = async function (lat, lon) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const weatherData = await weatherResponse.json();
    setWeatherData(weatherData);
  };

  //Background-image according to main weather and time (day or night)

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
    } else {
      weatherData.weather[0].icon.includes("d")
        ? (bgImg = MistDay)
        : (bgImg = MistNight);
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
          <SearchForm
            city={cityInput}
            setCity={setCityInput}
            searchCity={searchCity}
          />
          {!visibleItem && !weatherData.name && <Homepage />}
          {visibleItem && cityData.length > 0 && (
            <CitiesList
              cityData={cityData}
              visibleItem={visibleItem}
              setCityInput={setCityInput}
              setCityName={setCityName}
              searchWeather={searchWeather}
              setVisibleItem={setVisibleItem}
            />
          )}
          {weatherData.name && (
            <WeatherMainInfos cityName={cityName} weatherData={weatherData} />
          )}
        </div>
        {weatherData.name && <WeatherThumbnail weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;
