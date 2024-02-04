const CitiesList = ({
  cityData,
  setCityInput,
  setCityName,
  fetchWeather,
  showDropdown,
  setShowDropdown,
  inputRef,
}) => {
  return (
    <ul
      className="absolute w-60 sm:w-80 mt-2 text-center bg-white text-black border rounded-md"
      style={{
        boxShadow: "1px 1px 1px black, -1px -1px 1px black",
      }}
    >
      {cityData.map((city, index) => (
        <li
          key={`${city.country}-${index}`}
          onClick={() => {
            fetchWeather(city.lat, city.lon);
            setCityInput("");
            inputRef.current.focus();
            setCityName(city.name);
            setShowDropdown(!showDropdown);
          }}
          className="py-3 border-b last:border-0 cursor-pointer hover:bg-gray-300/30"
        >
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  );
};

export default CitiesList;
