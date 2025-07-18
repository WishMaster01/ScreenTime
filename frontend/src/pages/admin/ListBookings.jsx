import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets.js";
import Loading from "../../components/Loading.jsx";
import Title from "../../components/admin/Title.jsx";
import { dateFormat } from "../../library/dateFormat.js";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Title text1="LIST" text2="BOOKINGS" />

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
                      USER NAME
                    </th>
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
                      SEATS
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-white sm:pr-6"
                    >
                      AMOUNT
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bookings.length > 0 ? (
                    bookings.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.user.name}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.show.movie.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {dateFormat(item.show.showDateTime)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {Object.keys(item.bookedSeats)
                              .map((seat) => item.bookedSeats[seat])
                              .join(", ")}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium text-right sm:pr-6">
                          {currency} {item.amount}
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

export default ListBookings;
