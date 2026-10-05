import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 px-2">
          <p className="text-sm text-gray-400 uppercase tracking-[0.25em] mb-2">
            AI Recommendations
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Movies you might like
          </h1>

          <div className="mt-3 h-1 w-16 rounded-full bg-red-600"></div>
        </div>

        {/* Movie Results */}
        <div>
          {movieNames.map((movieName ,index)=><MovieList 
          key={movieName}
            title={movieName}
            movies={movieResults?.[index]?.filter(
              (movie) => movie.poster_path !== null
            )}
          />)}
          
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;