import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div className="bg-black">
        <div className="relative z-20 -mt-8 sm:-mt-10 md:-mt-10 lg:-mt-44">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

          <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />

          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />

          <MovieList title={"Popular"} movies={movies.popularMovies} />

          <MovieList title={"Trending"} movies={movies.trendingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
