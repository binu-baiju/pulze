import React from "react";
import Link from "next/link";
import HelpIcon from "../../../icons/HelpIcon";

const HomeHeader = () => {
  return (
    <div className="bg-white py-2.5 dark:bg-gray-800 w-full">
      <div className="flex flex-row flex-wrap justify-between items-center px-20">
        <div className="flex flex-row items-center">
          <div className="mx-10">
            <ul className="flex flex-col flex-wrap mt-4 justify-between items-center font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <a href="/home" className="flex items-center">
                <span className="self-center text-3xl font-bold font-poppins dark:text-white">
                  pulze
                </span>
              </a>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <button className="bg-[#8645FF] rounded-lg w-[100px] h-[30px] flex items-center justify-center">
            <Link
              href="./login"
              className="text-white font-semibold font-poppins text-xs text-center "
            >
              Login
            </Link>
          </button>

          <button className=" flex justify-center items-center">
            <HelpIcon className="scale-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
