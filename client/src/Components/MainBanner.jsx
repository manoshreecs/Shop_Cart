import React from "react";
import { Link } from "react-router-dom";
import banner_img from "../assets/banner.png";

const MainBanner = () => {
  return (
    <div className="w-full px-4 md:px-10 mt-0 mb-8">
      <div className="relative w-full h-[230px] md:h-[420px] rounded-[28px] md:rounded-[40px] overflow-hidden bg-[#D1FFD0]">
        <img src={banner_img} alt="Banner" className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-90" />

        <div className="relative z-10 md:hidden h-full flex flex-col px-4 pt-[48px]">
          <h1 className="text-[16px] font-bold text-[#1F2937] leading-snug">
            Quality Without <br /> Compromise, <br /> Prices Without <br /> Surprise!
          </h1>

          <div className="mt-auto pb-3 flex gap-[2px]">
            <Link to="/products" className="w-[32%] text-center py-2 rounded-full text-[11px] font-semibold bg-[#00AB4F] text-white hover:bg-[#009645]">
              Shop now
            </Link>

            <Link to="/products" className="w-[42%] text-center py-2 rounded-full text-[11px] font-semibold bg-gray-600 text-white hover:bg-gray-700">
              Explore deals →
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden md:flex h-full flex-col justify-center px-20 pr-[40%] gap-6">
          <h1 className="text-[54px] font-bold text-[#1F2937] leading-tight max-w-2xl">
            Quality Without Compromise, <br /> Prices Without Surprise!
          </h1>

          <div className="flex gap-4">
            <Link to="/products" className="px-7 py-2.5 rounded-full text-sm font-semibold bg-[#00AB4F] text-white hover:bg-[#009645]">
              Shop now
            </Link>

            <Link to="/products" className="px-7 py-2.5 rounded-full text-sm font-semibold bg-gray-600 text-white hover:bg-gray-700">
              Explore deals →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
