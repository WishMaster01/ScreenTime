import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets.js";
import Loading from "../../components/Loading.jsx";
import Title from "../../components/admin/Title.jsx";
import BlurCircle from "../../components/BlurCircle.jsx";
import { dateFormat } from "../../library/dateFormat.js";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Revenue",
      value: currency + (dashboardData.totalRevenue || "0"),
      icon: CircleDollarSignIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Active Shows",
      value:
        (dashboardData.activeShows ? dashboardData.activeShows.length : 0) ||
        "0",
      icon: PlayCircleIcon,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <Title text1="ADMIN" text2="DASHBOARD" />

      {/* Stats Cards */}
      <div className="relative mt-8">
        <BlurCircle top="-100px" left="0" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md ${card.color}`}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {card.title}
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{card.value}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Shows Section */}
      <div className="mt-12">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          ACTIVE SHOWS
        </h2>
        <div className="mt-6">
          <BlurCircle top="100px" left="-10%" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg"
              >
                {/* Fixed image container with proper aspect ratio */}
                <div className="aspect-[2/3] w-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={show.movie.poster_path}
                    alt={show.movie.title}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {show.movie.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">
                      {currency} {show.showPrice}
                    </p>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-500">
                        {show.movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {dateFormat(show.showDateTime)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
