import AnchorLink from "react-anchor-link-smooth-scroll";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./../Provider/AuthProvider";
import { useContext } from "react";
import useUsers from "../Hooks/useUsers";

function Navbar() {
  const { users } = useUsers();
  const { user } = useContext(AuthContext);
  const owner = users.find((u) => u.email === user?.email);

  const navigate = useNavigate();
  const links = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink to="/donar">Donar</NavLink>
      <NavLink className="text-red-500 font-medium " to="/events">
        Event🔥
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );
  return (
    <div className="navbar  sticky w-full z-10 top-0 backdrop-blur-sm bg-opacity-50 shadow-lg ">
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
        <ul className="menu menu-horizontal px-1 flex gap-8 text-xl py-4 font-medium">
          {links}
        </ul>
      </div>
      <div className="navbar-end ">
        {owner ? (
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center mb-4  group"
          >
            {owner?.profileImage ? (
              <img
                src={owner?.photoURL}
                alt={owner?.name}
                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500 group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 border-2 border-blue-500 group-hover:scale-110 transition-transform duration-300">
                <span className="text-blue-500 font-bold text-lg ">
                  {owner?.name?.charAt(0)}
                </span>
              </div>
            )}
            <div className="hidden md:flex flex-col">
              <h2 className="text-xl font-bold">{owner?.name}</h2>
            </div>
          </div>
        ) : (
          <NavLink to="/register" className="btn bg-primary text-white">
            Become a Member
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
