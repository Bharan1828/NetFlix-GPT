import Header from "./Header";
const Error = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4"> Sign Out Failed </h1>
          <p className="text-lg text-gray-400">
            Something went wrong while signing you out.
          </p>
          <p className="mt-2 text-lg text-gray-400"> Please try again. </p>
        </div>
      </div>
    </div>
  );
};
export default Error;
