const SearchForm = ({ cityInput, setCityInput, inputRef }) => {
  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex justify-center pt-5">
      <input
        type="text"
        placeholder="Enter a city..."
        autoFocus
        ref={inputRef}
        value={cityInput}
        onChange={handleInputChange}
        className="w-80 py-3 pl-5 outline-none text-black rounded-md"
        style={{
          boxShadow: "1px 1px 1px black, -1px -1px 1px black",
        }}
      />
    </form>
  );
};

export default SearchForm;
