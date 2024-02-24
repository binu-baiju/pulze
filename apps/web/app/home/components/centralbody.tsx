import React from "react";
import NotIcon from "../../../icons/NotIcon";
import ResponseIcon from "../../../icons/ResponseIcon";

const CentralBody = () => {
  return (
    <div className="container mx-auto mt-8 border-4 h-fit w-full flex flex-col items-center">
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
              href="#"
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
        <div className="grid grid-cols-2 gap-4 mt-36 mb-36">
          <div className="col-span-1 ">
            <div className="mb-56 w-[450px] h-[220px] border-2 text-left">
              <p className="font-poppins font-bold text-[40px]">
                Show what you're taling about
              </p>
              <div className="pt-2">
                <p className="text-lg font-medium mb-4 text-2xl font-poppins">
                  Send your work to your team,send and comment by text and
                  recording. Great for feedback on designs, copy, docs, and apps
                </p>
              </div>
            </div>
          </div>

          {/* Column 2, Row 1 */}
          <div className="col-span-1">
            <div className="mb-4">{/* Similar structure as Column 1 */}</div>
          </div>

          {/* Column 1, Row 2 */}
          <div className="col-span-1 ">
            <div className="mb-4 w-[450px] h-[220px] border-2 text-left">
              <p className="font-poppins font-bold text-[40px]">
                Record in different modes .
              </p>
              <div className="pt-2">
                <p className="text-lg font-medium mb-2 text-2xl font-poppins">
                  Send your recording in different modes by full screen,camera
                  and upload
                </p>
                {/* Your content for Data 1 */}
              </div>
            </div>
          </div>
          {/* Column 2, Row 2 */}
          <div className="col-span-1">
            {/* Similar structure as Column 1 */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-poppins  font-bold text-6xl mt-[-20px] tracking-wider leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          How it works
        </p>
      </div>
      <div className="matrix-2">
        <div className="grid grid-cols-3 grid-rows-1 gap-8 pb-16">
          <div className="col-span-1 flex flex-col items-center justify-center">
            <ResponseIcon className="scale-[40%]" />
            <div className="w-[370px] h-[120px] border-2 text-left mb-4 mt-[-40px] flex flex-col items-start justify-center">
              <p className="font-poppins font-bold text-[40px]">Record</p>
              <p className="text-lg font-medium text-2xl font-poppins text-left">
                Don't write it. Show it with screen sharing and voice-over
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center">
            <ResponseIcon className="scale-[40%]" />
            <div className="w-[370px] h-[120px] border-2 text-left mb-4 mt-[-40px] flex flex-col items-start justify-center">
              <p className="font-poppins font-bold text-[40px]">Assign</p>
              <p className="text-lg font-medium text-2xl font-poppins text-left">
                Define who you need a response from and by when
              </p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center justify-center">
            <ResponseIcon className="scale-[40%]" />
            <div className="w-[370px] h-[150px] border-2 text-left mt-[-40px] flex flex-col items-start justify-center">
              <p className="font-poppins font-bold text-[40px]">Converse</p>
              <p className="text-lg font-medium text-2xl text-left font-poppins">
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
