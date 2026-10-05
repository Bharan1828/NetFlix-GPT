import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { loginbg_URl } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <img
          src={loginbg_URl}
          alt="Bg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/60"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
