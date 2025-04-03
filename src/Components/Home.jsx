import React from "react";
import EventPage from "./Event/EventPage";

function Home() {
  return (
    <div className="" id="home">
      <div className="home min-h-screen flex   py-14 flex-col justify- items-center  z-1">
        {/* Middle */}
        <div className="  ">
          <h3 className="text-3xl md:text-4xl text-center py-4">
            বিসমিল্লাহির রহমানির রাহীম।
          </h3>
          <div className="flex  justify-between">
            <p className="pl-2 md:pl-10 lg:pl-20 bg-green-500 p-2 rounded-tr-3xl">
              {" "}
              মুমূর্ষু রোগির প্রাণের টানে,{" "}
            </p>
            <p className="pr-2 md:pr-10 lg:pr-20 bg-red-500 p-2 rounded-tl-3xl">
              এগিয়ে আসুন রক্তদানে।
            </p>
          </div>
          <h2 className="text-5xl py-10 text-center leading-16 font-medium md:leading-20">
            গোবিন্দগঞ্জ স্বেচ্ছায় রক্তদান সংগঠন (G.S R.S)
          </h2>
          <p className="p-8 text-center lg:text-2xl leading-7 md:leading-10">
            দুরন্তমনা পথচলার দৃপ্ত ভরসা, ভালবাসার সংগঠন, "গোবিন্দগঞ্জ স্বেচ্ছায়
            রক্তদান সংগঠন (G.S R.S) এর ৮ম বর্ষে পদার্পণ উপলক্ষে ৭ম প্রতিষ্ঠা
            বার্ষিকী অনুষ্ঠান আগামী ০৫ এপ্রিল ২০২৫ খ্রিষ্টাব্দে অনুষ্ঠিত হবে
            ইনশাআল্লাহ।
          </p>
        </div>
      </div>
      <EventPage></EventPage>
    </div>
  );
}

export default Home;
