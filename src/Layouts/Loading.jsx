import React from "react";
import loader from "../assets/spinner.svg";
function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img className="w-40" src={loader} alt="Loading..." />
    </div>
  );
}

export default Loading;
