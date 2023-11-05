const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-500">
      <p className="text-black text-lg mb-3">Loading...</p>
      <div className="w-14 h-14 border-4 border-[#f3f3f3] border-t-[#3498db] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
