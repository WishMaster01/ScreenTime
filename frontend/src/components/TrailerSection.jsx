import React, { useState } from "react";
import BlurCircle from "./BlurCircle.jsx";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const dummyTrailers = [
    {
      id: "WpW36ldAqnM",
      title: "MARVEL TELEVISION'S IRONHEART | OFFICIAL TRAILER | DISNEY+",
    },
    {
      id: "-sAOWhvheK8",
      title: "Marvel Studios Thunderbolts* | Final Trailer",
    },
    {
      id: "1pHDWnXmK7Y",
      title: "Captain America: Brave New World | Official Trailer",
    },
    {
      id: "umiKiW4En9g",
      title:
        "Marvel Animation’s What If…? Season 3 | Official Trailer | Disney+",
    },
  ];

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  const getThumbnailUrl = (id) =>
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  const getEmbedUrl = (id) =>
    `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto mb-6">
        Trailers
      </p>

      <div className="relative max-w-[960px] mx-auto">
        <BlurCircle top="-100px" right="-100px" />

        {/* Main YouTube Iframe */}
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            src={getEmbedUrl(currentTrailer.id)}
            title={currentTrailer.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Trailer Info */}
        <div className="mt-4 text-white">
          <h3 className="text-xl font-bold">{currentTrailer.title}</h3>
          <div className="flex items-center mt-2 space-x-4 text-gray-400">
            <span>Watch Later</span>
            <span>Share</span>
          </div>
          <div className="mt-1 text-gray-400">
            <p>{currentTrailer.title.toUpperCase()}</p>
            <p className="text-sm">YouTube</p>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="group grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map((trailer) => (
            <div
              key={trailer.id}
              className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer"
              onClick={() => setCurrentTrailer(trailer)}
            >
              <img
                src={getThumbnailUrl(trailer.id)}
                alt={`TRAILER ${trailer.id}`}
                className="rounded-lg w-full h-full object-cover brightness-75"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/480x270?text=No+Thumbnail";
                }}
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrailerSection;
