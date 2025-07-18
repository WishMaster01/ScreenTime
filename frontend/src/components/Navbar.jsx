import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, SearchIcon, TicketPlusIcon, XIcon } from "lucide-react";
import { assets } from "../assets/assets.js";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img
          src={assets.screenTime}
          alt="SCREEN TIME LOGO"
          className="w-36 h-auto cursor-pointer"
        />
      </Link>

      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
        />

        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
        >
          HOME
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
        >
          MOVIES
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/threaters"
        >
          THREATERS
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/releases"
        >
          RELEASES
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/favorite"
        >
          FAVORITES
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            LOGIN
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlusIcon width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon
        onClick={() => setIsOpen(!isOpen)}
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
      />
    </div>
  );
};

export default Navbar;

{
  /* <div className="top-0 left-0 right-0 z-50 w-full flex justify-between items-center px-6 py-5 bg-black/80 backdrop-blur-sm">
      {/* Logo */
}
// <Link to={"/"} className="max-md:flex-1">
//   <img
//     src={assets.screenTime}
//     alt="Screen Time Logo"
//     className="w-48 h-auto"
//   />
// </Link>

// {/* Desktop Navigation */}
// <div className="hidden md:flex items-center gap-8 rounded-full px-8 py-3 backdrop-blur-md bg-black/70 border border-gray-300/20">
//   <Link to={"/"} className="hover:text-gray-300">
//     Home
//   </Link>
//   <Link to={"/movies"} className="hover:text-gray-300">
//     Movies
//   </Link>
//   <Link to={"/theaters"} className="hover:text-gray-300">
//     Theaters
//   </Link>
//   <Link to={"/releases"} className="hover:text-gray-300">
//     Releases
//   </Link>
//   <Link to={"/favorite"} className="hover:text-gray-300">
//     Favorites
//   </Link>
// </div>

// {/* Desktop Search and Login */}
// <div className="hidden md:flex items-center gap-8">
//   <SearchIcon className="w-6 h-6 cursor-pointer hover:text-gray-300" />
//   <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
//     Login
//   </button>
// </div>

// {/* Mobile Menu Button */}
// <div className="flex md:hidden items-center gap-4">
//   <SearchIcon className="w-6 h-6 cursor-pointer" />
//   <button
//     className="focus:outline-none"
//     onClick={() => setMobileMenuOpen(true)}
//   >
//     <MenuIcon className="w-8 h-8" />
//   </button>
// </div>

// {/* Mobile Menu Overlay */}
// {mobileMenuOpen && (
//   <div className="md:hidden fixed inset-0 z-[9999]">
//     {" "}
//     {/* Increased z-index to ensure visibility */}
//     <div
//       className="absolute inset-0 bg-black/90 backdrop-blur-lg"
//       onClick={() => setMobileMenuOpen(false)}
//     ></div>
//     {/* Menu Content */}
//     <div className="relative z-50 h-full w-full flex flex-col items-center justify-center gap-8">
//       <button
//         className="absolute top-6 right-6 text-white focus:outline-none"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         <XIcon className="w-8 h-8" />
//       </button>

//       <Link
//         to={"/"}
//         className="text-white text-2xl hover:text-gray-300"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Home
//       </Link>
//       <Link
//         to={"/movies"}
//         className="text-white text-2xl hover:text-gray-300"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Movies
//       </Link>
//       <Link
//         to={"/theaters"}
//         className="text-white text-2xl hover:text-gray-300"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Theaters
//       </Link>
//       <Link
//         to={"/releases"}
//         className="text-white text-2xl hover:text-gray-300"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Releases
//       </Link>
//       <Link
//         to={"/favorite"}
//         className="text-white text-2xl hover:text-gray-300"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Favorites
//       </Link>

//       <button className="mt-8 px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer text-lg text-white">
//         Login
//       </button>
//     </div>
//   </div>
// )}
// </div> */}
