"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { Button } from "ui";
import { Icons } from "ui/components/icons";
import { Checkbox } from "ui/components/checkbox";
import { Textarea } from "ui/components/textarea";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui/components/tabs";
import ToggleButton from "../../../../VideoScreenRecorder/components/toggleButton";
// import ToggleButton from "../../../VideoScreenRecorder/components/toggleButton";

import { Send, SendHorizontal, Type } from "lucide-react";
import TimeStamp from "./timestamp";

const GettinResponse = () => {
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
    if (currentTime !== null) {
      console.log("Current Time:", currentTime);
    }

    // Focus on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaFocus = () => {
    setIsTextareaFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsTextareaFocused(false);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  return (
    <>
      <div className="flex justify-left items-center bg-white  h-[42px]  ">
        <div className="flex  w-48 justify-around ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-to-line"
          >
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
          </svg>
          <p className="">Pulze Title</p>
        </div>
      </div>
      <div className="flex flex-grow flex-col lg:flex-row">
        <div className="flex-[70%]  flex flex-col">
          <div className="flex  h-16 gap-2 items-center ">
            <div className="ml-12">
              <img
                src="/apps/web/public/images/Ellipse 1.png"
                width={10}
                height={10}
                alt="Picture of the author"
              />
            </div>

            <div className="flex gap-2">
              <span className="title text-xs font-semibold ">Binu Baiju</span>
              <span className="subtitle text-xs font-light">
                Created on 13 AUG 2019
              </span>
            </div>
          </div>
          <div className="flex-1    flex items-center justify-center md:items-start">
            <div className="flex flex-1 justify-center items-center  h-full w-full  md:h-4/6 px-10 md:px-0">
              <VideoPlayer onTimeUpdate={handleTimeUpdate} />
              {/* <VideoPlayer videoUrl="/docs/videos/flowbite.mp4" /> */}
            </div>
          </div>
        </div>
        <div className="flex-[30%] flex justify-center items-end ">
          <div className="bg-white h-[250px] rounded-lg  w-11/12 mb-5 flex items-center justify-center ">
            <div className="">
              <img
                src="/apps/web/public/images/Ellipse 1.png"
                width={10}
                height={10}
                alt="Picture of the author"
              />
            </div>
            <div className="flex flex-col justify-center items-center bg-white   h-5/6 w-11/12">
              <div className="h-4/6 w-11/12    flex justify-center items-center">
                <Tabs
                  defaultValue="text"
                  className="w-full h-full rounded-lg   "
                >
                  <TabsList className="flex h-1/3 justify-around items-center gap-2 bg-white focus:bg-gray-100">
                    <TabsTrigger
                      value="text"
                      className="  w-1/3 ring-0 focus:bg-violet-600 bg-violet-200 flex gap-3 focus:ring-0"
                    >
                      <Type />
                    </TabsTrigger>
                    <TabsTrigger
                      value="screen"
                      className=" w-1/3 focus:bg-violet-600 bg-violet-200 flex  justify-center items-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M30 2.994h-28c-1.099 0-2 0.9-2 2v17.006c0 1.099 0.9 1.999 2 1.999h13v3.006h-5c-0.552 0-1 0.448-1 1s0.448 1 1 1h12c0.552 0 1-0.448 1-1s-0.448-1-1-1h-5v-3.006h13c1.099 0 2-0.9 2-1.999v-17.006c0-1.1-0.901-2-2-2zM30 22h-28v-17.006h28v17.006z"></path>{" "}
                        </g>
                      </svg>
                      <p className="text-sm mb-1"> </p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="camera"
                      className="  w-1/3 focus:bg-violet-600 bg-violet-200 flex gap-3"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger
                      value="upload"
                      className="  w-1/3 ring-0 focus-visible:bg-violet-600 bg-violet-200 flex gap-3 focus:ring-0"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="#000000"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                        strokeWidth="19.456"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M763.024 259.968C718.4 141.536 622.465 66.527 477.553 66.527c-184.384 0-313.392 136.912-324.479 315.536C64.177 410.495.002 501.183.002 603.903c0 125.744 98.848 231.968 215.823 231.968h92.448c17.664 0 32-14.336 32-32 0-17.68-14.336-32-32-32h-92.448c-82.304 0-152.832-76.912-152.832-167.968 0-80.464 56.416-153.056 127.184-165.216l29.04-5.008-2.576-29.328-.24-.368c0-155.872 102.576-273.44 261.152-273.44 127.104 0 198.513 62.624 231.537 169.44l6.847 22.032 23.056.496c118.88 2.496 223.104 98.945 223.104 218.77 0 109.055-72.273 230.591-181.696 230.591h-73.12c-17.664 0-32 14.336-32 32 0 17.68 14.336 32 32 32l72.88-.095c160-4.224 243.344-157.071 243.344-294.495 0-147.712-115.76-265.744-260.48-281.312zM535.985 514.941c-.176-.192-.241-.352-.354-.512l-8.095-8.464c-4.432-4.688-10.336-7.008-16.24-6.976-5.905-.048-11.777 2.288-16.289 6.975l-8.095 8.464c-.16.16-.193.353-.336.513L371.072 642.685c-8.944 9.344-8.944 24.464 0 33.84l8.064 5.471c8.945 9.344 23.44 6.32 32.368-3.024l68.113-75.935v322.432c0 17.664 14.336 32 32 32s32-14.336 32-32V603.34l70.368 77.631c8.944 9.344 23.408 12.369 32.336 3.025l8.064-5.472c8.945-9.376 8.945-24.496 0-33.84z"></path>
                        </g>
                      </svg>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="w-full h-4/6 mb-4  ">
                    {/* Make changes to your account here. */}
                    {/* <div className="flex bg-red-500 flex-col items-start w-full h-full"> */}
                    <Textarea
                      ref={textareaRef}
                      placeholder="Add a comment"
                      onFocus={handleTextareaFocus}
                      onBlur={handleTextareaBlur}
                      value={textareaValue}
                      onChange={handleTextareaChange}
                      className="w-full h-full bg-gray-200"
                    />
                    {/* </div> */}
                  </TabsContent>
                  <TabsContent
                    value="screen"
                    className="flex flex-col justify-between items-center  h-5/6"
                  >
                    Make changes to your account here.
                    <div className="flex flex-col items-start w-full ml-9 gap-3">
                      <ToggleButton
                        icon1={<Icons.audioOn />}
                        icon2={<Icons.audioOff />}
                      />
                      <ToggleButton
                        icon1={<Icons.audioOn />}
                        icon2={<Icons.audioOff />}
                      />
                      <div className=" w-11/12">
                        <Button className="w-full">hghg</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="camera" className="flex justify-center">
                    Change your password here.
                    <ToggleButton
                      icon1={<Icons.audioOn />}
                      icon2={<Icons.audioOff />}
                    />
                  </TabsContent>
                  <TabsContent value="upload" className="flex justify-center">
                    Change your password here.
                  </TabsContent>
                </Tabs>
              </div>
              <div
                className={`flex items-center mt-3 w-11/12 ${
                  !currentTime && !isTextareaFocused
                    ? "justify-end"
                    : "justify-between"
                }`}
              >
                {currentTime !== null || isTextareaFocused ? (
                  currentTime !== null ? (
                    <TimeStamp currentTime={currentTime} />
                  ) : (
                    <span className="subtitle font-light flex justify-center gap-2">
                      <Checkbox /> <p className="text-xs">Insert at 0:00</p>
                    </span>
                  )
                ) : null}

                <Button
                  variant="default"
                  size="sm" // You can adjust the size here
                  disabled={!textareaValue}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Post <Send />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettinResponse;

{
}
