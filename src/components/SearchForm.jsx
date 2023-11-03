const SearchForm = ({ city, setCity, searchCity }) => {
  // Enable Enter key for city search input
  const handleSubmit = (event) => {
    event.preventDefault();
    searchCity();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center pt-5">
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
  );
};

export default SearchForm;
