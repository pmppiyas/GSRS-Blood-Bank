import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";

function HomeLayout() {
  const { loading } = useContext(AuthContext);

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto">
        <div className="min-h-screen">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default HomeLayout;
