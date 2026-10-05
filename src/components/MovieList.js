import React from "react";
import MovieCart from "./MovieCart";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h1 className="text-2xl py-4 text-white font-semibold">{title}</h1>
      <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1">
          {movies?.map((movie) => (
            <MovieCart key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
