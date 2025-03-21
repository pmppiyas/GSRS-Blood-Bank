import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function HomeLayout() {
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
