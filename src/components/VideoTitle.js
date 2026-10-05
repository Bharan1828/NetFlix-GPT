const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="
        w-full
        aspect-video
        pt-[20%]
        sm:pt-[20%]
        md:pt-[18%]
        lg:pt-[15%]
        px-4
        sm:px-6
        md:px-10
        lg:px-12
        absolute
        z-10
        text-white
        bg-gradient-to-r
        from-black
      "
    >
      <h1
        className="
          text-xl
          sm:text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
          max-w-[90%]
          sm:max-w-[80%]
          md:max-w-[70%]
        "
      >
        {title}
      </h1>

      <p
        className="
          hidden
          md:inline-block
          py-3
          sm:py-4
          md:py-6
          text-xs
          sm:text-sm
          md:text-base
          lg:text-md
          w-[90%]
          sm:w-[70%]
          md:w-1/2
          lg:w-1/4
          line-clamp-3
          sm:line-clamp-4
        "
      >
        {overview}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          className="
            bg-white
            text-black
            px-4
            sm:px-6
            md:px-8
            lg:px-12
            py-2
            sm:py-3
            md:py-4
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            rounded-lg
            hover:bg-opacity-75
          "
        >
          ▶︎ Play
        </button>

        <button
          className="
            bg-gray-700
            text-white
            px-4
            sm:px-6
            md:px-8
            lg:px-12
            py-2
            sm:py-3
            md:py-4
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            bg-opacity-50
            rounded-lg
          "
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
