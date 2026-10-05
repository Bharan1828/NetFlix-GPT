import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieid }) => {
  const selector = useSelector((store) => store.movies?.addTrailerVideo);

  useMovieTrailer(movieid);

  return (
    <div className="w-full overflow-hidden">
      <iframe
        className="
          w-full
          aspect-video
          -mt-8
          sm:-mt-12
          md:-mt-16
          lg:-mt-20
          scale-105
          sm:scale-110
          md:scale-110
        "
        src={
          "https://www.youtube.com/embed/" +
          selector?.key +
          "?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=" +
          selector?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
