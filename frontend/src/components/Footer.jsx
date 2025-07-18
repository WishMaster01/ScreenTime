import React from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img
            alt="SCREEN TIME LOGO"
            className="w-36 h-auto"
            src={assets.screenTime}
          />
          <p className="mt-6 text-sm">
            🎬 Book Your Seats. <br /> Escape Into Cinema. Welcome to{" "}
            <span className="text-primary-dull">ScreenTime</span>, your ultimate
            destination for hassle-free movie ticket booking. Whether you're
            planning Link night out with friends or Link cozy family weekend, we
            make it easy to browse showtimes, explore the latest blockbusters,
            and reserve your favorite seats — all in just Link few clicks. Enjoy
            Link seamless experience with real-time availability, secure
            payments, and instant confirmation. Skip the queues and step
            straight into the magic of the big screen!
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-10 w-auto border border-white rounded"
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-10 w-auto border border-white rounded"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-end gap-8 md:gap-20 lg:gap-40">
          {/* Company Section */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 lg:gap-40">
            <div>
              <h2 className="font-semibold mb-5">Company</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/"}>About us</Link>
                </li>
                <li>
                  <Link to={"/"}>Contact us</Link>
                </li>
                <li>
                  <Link to={"/"}>Privacy policy</Link>
                </li>
              </ul>
            </div>

            {/* Get In Touch Section */}
            <div>
              <h2 className="font-semibold mb-5">Get in touch</h2>
              <div className="text-sm space-y-2">
                <p>+1-234-567-890</p>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>

          {/* Subscribe Newsletter section */}
          <div className="mt-8 md:mt-0">
            <h2 className="font-semibold text-white mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full sm:max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary w-full sm:w-24 h-9 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©{" "}
        <Link to={"/"}>
          <span className="text-primary-dull">ScreenTime</span>
        </Link>
        . All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
