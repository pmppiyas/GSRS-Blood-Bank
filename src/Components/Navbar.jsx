import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const links = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink className="text-red-500 font-medium " to="/events">
        Event🔥
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );
  return (
    <div className="navbar transparent shadow-sm sticky w-full z-10 top-0 backdrop-blur-sm bg-opacity-50 shadow-lg ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl ">GSRS</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-8 text-lg ">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn ">Become a Member</a>
      </div>
    </div>
  );
}

export default Navbar;
