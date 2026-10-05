import React, { useEffect, useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import groq from "../utils/groq";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, clearGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearGptMovieResult());
    };
  }, [dispatch]);

  // search movie in tmdb
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a professional movie recommendation system. " +
      "The user's movie request is: " +
      searchText.current.value +
      ". " +
      "Understand the user's requested language, genre, country, and other preferences from the query. " +
      // Exact movie title search rule
      "IMPORTANT: If the user's query contains or clearly refers to a specific movie title, treat it as a movie title search, NOT as a recommendation request. " +
      "In that case, return ONLY that specific movie title and do not recommend any other movies. " +
      "For example, if the user searches 'They Call Him OG', return ONLY 'They Call Him OG'. " +
      "If the user searches 'OG', and 'OG' clearly refers to the movie 'They Call Him OG', return ONLY 'They Call Him OG'. " +
      "Do not return 5 movies when the user is searching for a specific movie. " +
      "If the user explicitly requests Telugu movies, recommend ONLY movies originally made in the Telugu language. " +
      "Do NOT recommend English, Hindi, Tamil, Malayalam, Kannada, Korean, or other-language movies. " +
      "If the user requests a specific language or region, treat that requirement as mandatory. " +
      "For recommendation requests, recommend exactly 5 relevant movies released between 2004 and the present year. " +
      "If the query is a recommendation request and contains a specific movie title, include that movie as the first recommendation when appropriate. " +
      "Return ONLY the movie title or the 5 movie titles separated by commas. " +
      "Do not include numbering, bullet points, quotes, release years, explanations, or any extra text. " +
      "Use the official/common movie titles that are most likely to match TMDB search results. " +
      "Example for 'best Telugu comedy movies': Jathi Ratnalu, Ee Nagaraniki Emaindi, Pelli Choopulu, Dookudu, F2: Fun and Frustration. " +
      "Example for 'They Call Him OG': They Call Him OG. " +
      "Example for 'OG': They Call Him OG.";

    const gptResults = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      }),
    );
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-[10%] flex justify-center px-3 sm:px-6">
      <form
        className="
          w-full
          sm:w-[85%]
          md:w-3/4
          lg:w-1/2
          bg-black/80
          backdrop-blur-md
          border border-white/20
          rounded-xl
          sm:rounded-2xl
          p-1.5
          sm:p-2
          flex
          items-center
          shadow-2xl
          focus-within:border-white/40
          transition-all
          duration-300
        "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="flex-1
            min-w-0
            bg-transparent
            text-white
            px-3
            sm:px-4
            md:px-5
            py-3
            sm:py-3.5
            md:py-4
            outline-none
            placeholder-gray-400
            text-sm
            sm:text-base
            md:text-lg
          "
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        <button
          type="submit"
          className="
            px-4
            sm:px-5
            md:px-7
            py-3
            sm:py-3.5
            md:py-4
            rounded-lg
            sm:rounded-xl
            bg-white
            text-black
            font-semibold
            text-sm
            sm:text-base
            whitespace-nowrap
            hover:bg-gray-200
            transition-all
            duration-300
            shadow-lg
          "
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
