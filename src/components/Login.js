import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4263c437-c678-4724-ad80-e3ba0dc8761e/web/IN-en-20260921-TRIFECTA-perspective_95810136-2c4a-4ab4-a323-50418521e261_large.jpg"
          alt="Bg"
        />
      </div>
      <form className="p-10 bg-black absolute w-3/12 mt-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
        <h1 className="font-bold text-2xl py-4 px-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-gray-600 "
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-gray-600 "
        />
        
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-gray-600"
        />
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-gray-300 font-sans cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
