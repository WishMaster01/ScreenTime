import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Favorite from "./pages/Favorite.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import Footer from "./components/Footer.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Layout from "./pages/admin/Layout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddShows from "./pages/admin/addShows.jsx";
import ListShows from "./pages/admin/ListShows.jsx";
import ListBookings from "./pages/admin/ListBookings.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />

        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
