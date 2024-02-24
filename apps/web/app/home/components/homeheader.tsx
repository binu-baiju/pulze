import React from "react";
import Link from "next/link";
import HelpIcon from "../../../icons/HelpIcon";

const HomeHeader = () => {
  return (
    <div>
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-800 border-[3px] w-full">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/home" className="flex items-center">
            <span className="ml-[20px] self-center text-2xl font-bold font-poppins whitespace-nowrap dark:text-white">
              pulze
            </span>
          </a>
          <div
            className="w-full lg:flex lg:w-auto lg:order-1 ml-[-180px]"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 font-poppin font-semibold text-[14px] text-[#4B5563] border-b  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 font-poppin font-semibold text-[14px] text-[#4B5563] border-b  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 font-poppin font-semibold text-[14px] text-[#4B5563] border-b  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 font-poppin font-semibold text-[14px] text-[#4B5563] border-b  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 font-poppin font-semibold text-[14px]  text-[#4B5563] border-b  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex lg:order-2 space-x-24 ">
            <button className="bg-[#8645FF] rounded-lg w-[100px] h-[30px] flex items-center justify-center px-[50px] ">
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
      </nav>
    </div>
  );
};

export default HomeHeader;
