import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center shadow-2xl focus-within:border-white/40 transition-all duration-300">
        <input
          type="text"
          className="flex-1 bg-transparent text-white px-5 py-4 outline-none placeholder-gray-400 text-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        <button
          type="submit"
          className="px-7 py-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg flex items-center gap-2"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
