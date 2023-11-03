const Homepage = () => {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-evenly mt-24 text-gray-300 font-bold">
      <p className="text-5xl">Welcome</p>
      <p className="text-3xl">To</p>
      <p
        className="text-7xl text-center "
        style={{
          textShadow: "1px 1px 2px yellow, -1px -1px 2px yellow",
        }}
      >
        Weather App
      </p>
    </div>
  );
};

export default Homepage;
