import React from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default HomeLayout;
