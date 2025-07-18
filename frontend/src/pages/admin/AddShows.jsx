import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets.js";
import Loading from "../../components/Loading.jsx";
import Title from "../../components/admin/Title.jsx";
import { CheckIcon, XCircleIcon, StarIcon } from "lucide-react";
import { voteConverter } from "../../library/voteConverter.js";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPLayingMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    // Simulate fetching data
    setNowPLayingMovies(dummyShowsData);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      console.warn("Date and time input cannot be empty.");
      return;
    }

    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) {
      console.warn("Invalid date-time format.");
      return;
    }

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        const newTimes = [...times, time].sort();
        return { ...prev, [date]: newTimes };
      }
      return prev;
    });
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  const handleAddShows = () => {
    if (!selectedMovieId) {
      alert("Please select a movie.");
      return;
    }
    if (!showPrice || parseFloat(showPrice) <= 0) {
      alert("Please enter a valid show price.");
      return;
    }
    if (Object.keys(dateTimeSelection).length === 0) {
      alert("Please add at least one date and time for the show.");
      return;
    }

    // Prepare data for submission
    const showsToSubmit = [];
    Object.entries(dateTimeSelection).forEach(([date, times]) => {
      times.forEach((time) => {
        showsToSubmit.push({
          movieId: selectedMovieId,
          showDateTime: `${date}T${time}:00.000Z`,
          showPrice: parseFloat(showPrice),
          occupiedSeats: {},
        });
      });
    });

    console.log("Shows to add:", showsToSubmit);
    alert(
      "Shows data logged to console. In a real app, it would be sent to the API."
    );

    setSelectedMovieId(null);
    setDateTimeSelection({});
    setDateTimeInput("");
    setShowPrice("");
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <Title text1="ADD" text2="SHOWS" />

      {/* NOW PLAYING MOVIES */}
      <h2 className="text-2xl font-semibold mt-10 mb-6 text-white">
        NOW PLAYING MOVIES
      </h2>
      <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-gray-800">
        <div className="flex gap-6 mt-4 w-max min-w-full">
          {nowPlayingMovies.map((movie) => (
            <div
              onClick={() => setSelectedMovieId(movie.id)}
              key={movie.id}
              className={`relative flex-shrink-0 w-40 h-[280px] rounded-lg overflow-hidden cursor-pointer
                         transition-all duration-300 transform
                         ${
                           selectedMovieId === movie.id
                             ? "ring-4 ring-primary ring-offset-2 ring-offset-gray-900 scale-105 shadow-lg"
                             : "shadow-md hover:scale-102 hover:shadow-lg opacity-80 hover:opacity-100"
                         }`}
            >
              <img
                src={movie.poster_path}
                alt={movie.title || "Movie poster"}
                className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
              />

              {/* Movie info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-sm flex flex-col">
                <p className="font-semibold text-white truncate mb-1">
                  {movie.title}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span>{voteConverter(movie.vote_count)} Votes</span>
                </div>
              </div>

              {/* Selected indicator */}
              {selectedMovieId === movie.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-7 w-7 rounded-full shadow-lg">
                  <CheckIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SHOW PRICE INPUT */}
      <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
        <label
          htmlFor="show-price"
          className="block text-sm font-medium text-gray-300 mb-3"
        >
          SHOW PRICE
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <p className="text-gray-400 text-lg">{currency}</p>
          </div>
          <input
            id="show-price"
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md
                       text-white placeholder-gray-400 focus:ring-primary focus:border-primary outline-none text-lg"
          />
        </div>
      </div>

      {/* DATE & TIME SELECTION */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl">
        <label
          htmlFor="datetime-input"
          className="block text-sm font-medium text-gray-300 mb-3"
        >
          SELECT DATE AND TIME
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            id="datetime-input"
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-md
                       text-white placeholder-gray-400 focus:ring-primary focus:border-primary outline-none"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium
                       transition-colors duration-200 ease-in-out whitespace-nowrap cursor-pointer"
          >
            ADD TIME
          </button>
        </div>

        {/* Display Selected Times */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600">
            <h3 className="text-base font-semibold text-gray-200 mb-4">
              Selected Show Times:
            </h3>
            <ul className="space-y-3">
              {Object.entries(dateTimeSelection).map(([date, times]) => (
                <li key={date} className="bg-gray-800 p-3 rounded-md shadow-sm">
                  <div className="font-medium text-primary mb-2 border-b border-primary/30 pb-1">
                    {date}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    {times.map((time) => (
                      <div
                        key={time}
                        className="bg-gray-900 border border-gray-600 text-gray-200 px-3 py-1 flex items-center rounded-full
                                   shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-700"
                      >
                        <span>{time}</span>
                        <XCircleIcon
                          onClick={() => handleRemoveTime(date, time)}
                          size={18}
                          className="ml-2 text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ADD SHOWS BUTTON */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleAddShows}
          className="bg-primary hover:bg-primary-dark text-white text-lg font-semibold px-10 py-3 rounded-lg shadow-lg
                     transition-colors duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary/50 cursor-pointer"
        >
          ADD SHOWS
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default AddShows;
