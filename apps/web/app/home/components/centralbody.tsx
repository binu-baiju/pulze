import React from "react";
import NotIcon from "../../../icons/NotIcon";
import ContainerHeader from "../../../icons/ContainerHeader";
import ResponseIcon from "../../../icons/ResponseIcon";
import CentralBodyItem_1 from "../../../icons/CentralBodyItem-1";
import Dashboard_template_1 from "../../../icons/Dashboard_template_icons_1.png";
import Dashboard_template_2 from "../../../icons/Dashboard_template_icons_2.png";
import Dashboard_work_1 from "../../../icons/Dashboard_works_icons_1.png";
import Dashboard_work_2 from "../../../icons/Dashboard_works_icons_2.png";
import Dashboard_work_3 from "../../../icons/Dashboard_works_icons_3.png";
import Image from "next/image";
import Link from "next/link";
const CentralBody = () => {
  return (
    <div className="container mx-auto mt-8 h-fit w-screen flex flex-col items-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <div className="flex flex-col items-center mb-4">
            <NotIcon className="mr-[250px]" />
            <p className="text-poppins font-bold text-6xl mt-[-20px] tracking-wider leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Lets hop on a call
            </p>
          </div>
          <p className="mb-8 text-poppins text-lg font-semibold tracking-tighter text-[#4B5563] lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Get your point across with quick videos rather than hour-long
            meetings
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="/signup"
              className="inline-flex justify-center text-[Inter] items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#8645FF]  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Create test pulze{" "}
              <span className="text-xs mt-1" style={{ marginLeft: "4px" }}>
                in &lt; 2min
              </span>
            </a>
          </div>
        </div>
      </section>
      <div className="matrix-1">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-6 max-md:flex-wrap">
            <div className="justify-start max-md:px-2">
              <p className="font-poppins font-bold text-[40px]">
                Show what you're taling about
              </p>
              <div className="pt-2 w-11/12 mt-5">
                <p className="text-lg font-medium mb-4 text-2xl font-poppins">
                  Send your work to your team,send and comment by text and
                  recording. Great for feedback on designs, copy, docs, and apps
                </p>
              </div>
            </div>
            <div className="w-11/12 h-3/6 overflow-hidden shadow-2xl max-md:w-screen max-md:px-6">
              <Image src={Dashboard_template_1} alt="fireSpot" />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-6 max-md:flex-wrap mt-16">
            <div className="justify-start max-md:px-2">
              <p className="font-poppins font-bold text-[40px]">
                Record in different modes .
              </p>
              <div className="pt-2 md:w-7/12 mt-5">
                <p className="text-lg font-medium mb-4 text-2xl font-poppins">
                  Send your recording in different modes by full screen,camera
                  and upload
                </p>
              </div>
              <div className="">
                <button className="bg-[#8645FF] rounded-lg flex items-center justify-center p-3">
                  <Link
                    href="./login"
                    className="text-white font-semibold font-poppins text-base text-center "
                  >
                    Try Demo <span className="text-xs"> {"in < 2 min"}</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-6/12 h-3/6 overflow-hidden shadow-2xl mt-10 flex justify-center max-md:w-screen max-md:px-6">
              <Image src={Dashboard_template_2} alt="fireSpot" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-24">
        <p className="text-poppins font-bold text-6xl tracking-wider leading-none text-gray-900 max-md:text-5xl lg:text-6xl dark:text-white">
          How it works
        </p>
      </div>
      <div className="matrix-2">
        <div className="flex flex-row max-md:flex-wrap">
          <div className="flex flex-col p-10 flex-1 justify-between">
            <div className="image">
              <Image src={Dashboard_work_1} alt="fireSpot" />
            </div>
            <div className="text-left mb-4 flex flex-col items-start justify-center mt-2">
              <p className="font-poppins font-bold text-[40px]">Record</p>
              <p className="text-lg font-medium text-2xl font-poppins text-left">
                Don't write it. Show it with screen sharing and voice-over
              </p>
            </div>
          </div>
          <div className="flex flex-col p-10 flex-1 justify-between">
            <div className="image">
              <Image src={Dashboard_work_2} alt="fireSpot" />
            </div>
            <div className="text-left mb-4 flex flex-col items-start justify-center mt-2">
              <p className="font-poppins font-bold text-[40px]">Assign</p>
              <p className="text-lg font-medium text-2xl font-poppins text-left">
                Define who you need a response from and by when
              </p>
            </div>
          </div>
          <div className="flex flex-col p-10 flex-1 justify-between">
            <div className="image">
              <Image src={Dashboard_work_3} alt="fireSpot" />
            </div>
            <div className="text-left mb-4 flex flex-col items-start justify-center">
              <p className="font-poppins font-bold text-[40px]">Converse</p>
              <p className="text-lg font-medium text-2xl font-poppins text-left">
                Get back in the flow. We'll remind assignees if necessary, and
                inform you when they respond
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralBody;
