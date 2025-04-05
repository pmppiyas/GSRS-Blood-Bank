import React, { useEffect } from "react";
import EventPage from "./Event/EventPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="" id="home">
      <div className="home min-h-screen flex py-14 flex-col justify- items-center z-1">
        {/* Middle */}
        <div className="">
          <h3
            className="text-3xl md:text-4xl text-center py-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            বিসমিল্লাহির রহমানির রাহীম।
          </h3>
          <div className="flex justify-between">
            <p
              className="pl-2 md:pl-10 lg:pl-20 bg-green-500 p-2 rounded-tr-3xl"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              {" "}
              মুমূর্ষু রোগির প্রাণের টানে,{" "}
            </p>
            <p
              className="pr-2 md:pr-10 lg:pr-20 bg-red-500 p-2 rounded-tl-3xl"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              এগিয়ে আসুন রক্তদানে।
            </p>
          </div>
          <div
            onClick={() => navigate("/donar")}
            className="lg:hidden border-2 w-max h-22 rounded-full text-3xl font-bold text-center bg-blue-500 text-white  px-10 mx-auto my-10 flex items-center justify-center"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            Find Donar
          </div>
          <h2
            className="text-5xl py-10 text-center leading-16 font-medium md:leading-20"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            গোবিন্দগঞ্জ স্বেচ্ছায় রক্তদান সংগঠন (G.S R.S)
          </h2>
          <div
            onClick={() => navigate("/donar")}
            className="hidden border-2 w-max h-22 rounded-full text-3xl font-bold text-center bg-blue-500 text-white  px-10 mx-auto mb-10 lg:flex items-center justify-center"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            Find Donar
          </div>
          <p
            className="p-8 text-center lg:text-2xl leading-7 md:leading-10"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            দুরন্তমনা পথচলার দৃপ্ত ভরসা, ভালবাসার সংগঠন, "গোবিন্দগঞ্জ স্বেচ্ছায়
            রক্তদান সংগঠন (G.S R.S) এর ৮ম বর্ষে পদার্পণ উপলক্ষে ৭ম প্রতিষ্ঠা
            বার্ষিকী অনুষ্ঠান আগামী ০৫ এপ্রিল ২০২৫ খ্রিষ্টাব্দে অনুষ্ঠিত হবে
            ইনশাআল্লাহ।
          </p>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-duration="1200">
        <EventPage></EventPage>
      </div>
    </div>
  );
}

export default Home;
