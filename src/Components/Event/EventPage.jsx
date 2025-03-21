import React from "react";
import Heading from "../ui/Heading";
import quiz1 from "../../assets/quiz1.png";
function EventPage() {
  const events = [
    { id: 1, title: "Event 1", description: "This is event 1" },
    { id: 2, title: "Event 2", description: "This is event 2" },
    { id: 3, title: "Event 3", description: "This is event 3" },
    { id: 4, title: "Event 4", description: "This is event 4" },
  ];
  return (
    <div>
      <Heading
        title={"Our Event"}
        subtitle={"We are all working for humanity"}
      ></Heading>

      <div className=" flex flex-col md:flex-row gap-8 justify-between p-4 my-6">
        {/* Left */}
        <div className="flex flex-col  gap-4 md:w-1/2">
          <h2 className=" text-5xl md:text-7xl  font-medium">
            Quiz Competition
          </h2>
          <p className="text-xl ">
            By <strong className="text-red-600 text-2xl">GSRS</strong>
          </p>
          <p className="text-xl flex gap-2  items-center">
            PrizeMoney: <span className="text-3xl font-medium">20000 bdt</span>
            <span>(total)</span>
          </p>
          <p className="text-xl flex gap-2  items-center ">
            {" "}
            Date: <span className="text-xl">25/03/2025</span>
          </p>
          <p className="text-xl flex gap-2  items-center">
            {" "}
            Time: <span className="text-xl">10:00 AM</span>
          </p>
          <p className="text-xl">Location: Bd Hall, Gobindoganj, Gaibandha.</p>
          <button
            className="btn btn-primary w-max px-10 ml-auto mr-0"
            type="button"
          >
            Register
          </button>
        </div>
        {/* Right */}
        <div className=" md:w-1/2 flex justify-center items-center">
          <img className="w-full" src={quiz1}></img>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
