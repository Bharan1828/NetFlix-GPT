import React from "react";
import MovieCart from "./MovieCart";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-3 sm:px-4 md:px-6">
      <h1 className="text-lg sm:text-xl md:text-2xl py-2 sm:py-3 md:py-4 text-white font-semibold">
        {title}
      </h1>

      <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1 sm:gap-2">
          {movies?.map((movie) => (
            <MovieCart
              key={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;