import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCart = ({ posterPath }) => {
  return (
    <div className="w-28 sm:w-36 md:w-44 lg:w-48 pr-2 sm:pr-3 md:pr-4 flex-shrink-0">
      <img
        className="w-full aspect-[2/3] object-cover rounded-md"
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCart;
