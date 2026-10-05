import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { loginbg_URl } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <img
          src={loginbg_URl}
          alt="Bg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/80"></div>
      </div>

      <div className="pt-20 sm:pt-24 md:pt-28 px-3 sm:px-6 md:px-10">
        <GptSearchBar />

        <div className="mt-6 sm:mt-8 md:mt-10">
          <GptMovieSuggestions />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
