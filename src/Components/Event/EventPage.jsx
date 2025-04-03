import React from "react";
import Heading from "../ui/Heading";
import quiz1 from "../../assets/quiz1.png";
function EventPage() {
  return (
    <div className=" " id="event-page">
      <Heading
        title={"Our Event"}
        subtitle={"We are all working for humanity"}
      ></Heading>
      {/* Quiz Competition */}
      <div className="  flex flex-col md:flex-row gap-8 justify-between p-4 my-6 mt-10 ">
        {/* Left */}
        <div className="flex flex-col  gap-4 md:w-1/2 ">
          <h2 className=" text-5xl md:text-7xl  font-medium z-1">
            Quiz Competition
          </h2>
          <p className="text-xl ">
            By <strong className="text-red-600 text-2xl">GSRS</strong>
          </p>
          <p className="text-xl flex gap-2  items-center ">
            Only For{" "}
            <span className="bg-primary text-white px-2  rounded-sm">
              Class Six to Class Ten!
            </span>
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
          <div className="w-full  ml-auto  flex justify-end">
            <button className="btn btn-primary  px-10 text-lg" type="button">
              Register
            </button>{" "}
          </div>
        </div>
        {/* Right */}
        <div className=" md:w-1/2 flex justify-center items-center">
          <img className="w-full" src={quiz1}></img>
        </div>
      </div>
      {/* Middle */}
      <div className=" bg-red-50 ">
        <h2 className="text-2xl md:text-5xl py-10  md:leading-16 font-medium md:leading-20 text-center">
          গোবিন্দগঞ্জ স্বেচ্ছায় রক্তদান সংগঠন (G.S R.S)
        </h2>
        <p className="p-8 text-center lg:text-2xl leading-7 md:leading-10"></p>
      </div>
      {/* Milon mela*/}
      <div className=" flex flex-col md:flex-row gap-8 justify-between p-4 my-6 mt-20">
        {/* Left */}
        <div className=" md:w-1/2 flex justify-center items-center">
          <img className="w-full" src={quiz1}></img>
        </div>

        {/* Right */}
        <div className="flex flex-col  gap-4 md:w-1/2 relative">
          <h2 className=" text-5xl md:text-7xl  font-medium z-1">
            Get Together
          </h2>
          <p className="text-xl ">
            Arranged by <strong className="text-red-600 text-2xl">GSRS</strong>
          </p>
          <p className="text-xl flex gap-2  items-center">
            Resigter Fee: <span className="text-3xl font-medium">199 </span>bdt
          </p>
          <p className="text-xl flex gap-2  items-center ">
            {" "}
            Register's last date :{" "}
            <span className="text-xl bg-red-400 px-3 font-medium">
              25/03/2025
            </span>
          </p>
          <p className="text-xl flex gap-2  items-center ">
            {" "}
            Event Date :{" "}
            <span className="text-xl  px-3 font-medium">05/04/2025</span>
          </p>
          <p className="text-xl flex gap-2  items-center">
            {" "}
            Time: <span className="text-xl">10:00 AM</span>
          </p>
          <p className="text-xl">Location: BD Hall, Gobindoganj, Gaibandha.</p>
          <button
            className="btn btn-primary w-max px-10 ml-auto mr-0"
            type="button"
          >
            Register
          </button>
          <div className="absolute top-0 md:-top-6 right-0  bg-red-500 text-white p-2 rounded-lg -rotate-45 z-0">
            <h2 className="text-1xl">Upcoming</h2>
          </div>
        </div>
      </div>
      <div className="flex  flex-col bg-red-50 py-10 mb-20">
        <h3 className="text-5xl pb-4 text-center ">Rewards</h3>
        <ul className="flex justify-center gap-10 list-disc pl-8">
          <li className="text-lg font-medium">Tshirt</li>
          <li className="text-lg font-medium">ID Card</li>
          <li className="text-lg font-medium">Batch</li>
          <li className="text-lg font-medium">Lunch</li>
        </ul>
      </div>
    </div>
  );
}

export default EventPage;
