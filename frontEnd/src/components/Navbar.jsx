import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="w-full flex flex-col md:flex-row justify-between h-auto md:h-[5vw] bg-[#E2E8F0] px-6 md:px-[10vw] py-4 items-center">
      <div className="mb-2 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-[#687081]">Bisht</span>
          <span className="text-[#303946]">Estate</span>
        </h1>
      </div>

      <div className="mb-2 md:mb-0 w-full md:w-auto flex justify-center">
        <form className="bg-slate-100 flex items-center p-2 md:p-3 rounded-lg w-full md:w-auto">
          <input
            className="bg-transparent focus:outline-none w-full md:w-[18vw] text-sm md:text-base"
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600 text-lg md:text-xl" />
        </form>
      </div>

      {/* Navigation links as a list */}
      <ul className="flex justify-center md:justify-end w-full items-center md:w-auto text-sm md:text-xl font-semibold gap-3 md:gap-5">
        <li>
          <NavLink
            to="/"
            className="hover:opacity-80 transition-opacity duration-200"
            style={{ opacity: "0.5" }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className="hover:opacity-80 transition-opacity duration-200"
            style={{ opacity: "0.5" }}
          >
            About
          </NavLink>
        </li>
        <NavLink to="/profile">
          {currentUser ? (
            <img
              className="w-10 rounded-full h-10 object-cover"
              src={currentUser.avatar}
              alt="profile"
            ></img>
          ) : (
            <li className="text-slate-700 hover:underline">Sign In</li>
          )}
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
