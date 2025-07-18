import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets.js";
import Loading from "../../components/Loading.jsx";
import Title from "../../components/admin/Title.jsx";
import { dateFormat } from "../../library/dateFormat.js";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      // Simulate fetching data
      setShows([
        {
          _id: "show_id_1",
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
            D1: "user_4",
            E1: "user_5",
          },
        },
        {
          _id: "show_id_2",
          movie: dummyShowsData[1],
          showDateTime: "2025-07-15T18:00:00.000Z",
          showPrice: 75,
          occupiedSeats: {
            A1: "user_1",
            A2: "user_2",
            B3: "user_3",
            C4: "user_4",
            D5: "user_5",
            E6: "user_6",
            F7: "user_7",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Title text1="LIST" text2="SHOWS" />

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gradient-to-r from-primary to-primary-dull">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                    >
                      MOVIE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      SHOW TIME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                    >
                      TOTAL BOOKINGS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-white sm:pr-6"
                    >
                      EARNINGS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {shows.length > 0 ? (
                    shows.map((show) => (
                      <tr
                        key={show._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {show.movie.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dateFormat(show.showDateTime)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {Object.keys(show.occupiedSeats).length}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium text-right sm:pr-6">
                          {currency}{" "}
                          {(
                            Object.keys(show.occupiedSeats).length *
                            show.showPrice
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No shows available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListShows;
