const WeatherMainInfos = ({ cityName, weatherData }) => {
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

  // Local date and time

  const timezoneJS = weatherData.timezone * 1000;
  const weekDay = new Date(Date.now() + timezoneJS).getUTCDay();
  let day = new Date(Date.now() + timezoneJS).getUTCDate();
  day < 10 ? (day = `0${day}`) : day;
  const month = new Date(Date.now() + timezoneJS).getUTCMonth();
  const year = new Date(Date.now() + timezoneJS).getUTCFullYear();
  let hours = new Date(Date.now() + timezoneJS).getUTCHours();
  hours < 10 ? (hours = `0${hours}`) : hours;
  let minutes = new Date(Date.now() + timezoneJS).getUTCMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  const now = `${weekTab[weekDay]}, ${day} ${monthTab[month]} ${year} - ${hours}:${minutes}`;

  return (
    <div
      className="flex flex-col items-center mt-6 sm:mt-20"
      style={{ textShadow: "1px 1px 2px black, -1px -1px 2px black" }}
    >
      <p className="text-3xl">
        {cityName}, {weatherData.sys.country}
      </p>
      <p>{now}</p>
      <p className="text-7xl lg:text-8xl mt-16 sm:mt-20 mb-2">
        {Math.round(weatherData.main.temp)} °C
      </p>
      <p className="mb-3">
        ( Feels like: {Math.round(weatherData.main.feels_like)} °C )
      </p>
      <div className="flex text-2xl mb-4 sm:mb-10">
        <p>Max {Math.floor(weatherData.main.temp_max)} °C&nbsp;&nbsp;/</p>
        <p>&nbsp;&nbsp; Min {Math.floor(weatherData.main.temp_min)} °C</p>
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
  );
};

export default WeatherMainInfos;
