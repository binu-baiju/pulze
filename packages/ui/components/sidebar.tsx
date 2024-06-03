"use client";
import { useState } from "react";
// import { cn } from "../lib/utils";
import { Button } from "./button";

interface SidebarProps {
  onSidebarClick: (page: string) => void;
}

export function Sidebar({ onSidebarClick }: SidebarProps) {
  const [activeButton, setActiveButton] = useState<string | null>("activity");
  const handleButtonClick = (page: string) => {
    onSidebarClick(page);
    setActiveButton(page);
  };
  return (
    <div className="">
      {/* <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1"> */}
      <div className="">
        <div className="">
          <div className="h">
            <Button
              className={`w-full justify-start hover:bg-purple-200 ${
                activeButton === "activity"
                  ? "bg-purple-200"
                  : "hover:bg-purple-200"
              }`}
              variant="ghost"
              onClick={() => handleButtonClick("activity")}
            >
              <svg
                className="h-4 w-4 mr-2 "
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />{" "}
                  <path
                    d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                    opacity="0.5"
                    stroke="#1C274C"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />{" "}
                </g>
              </svg>
              Activity
            </Button>
            <Button
              className={`w-full justify-start hover:bg-purple-200 ${
                activeButton === "myPulzez"
                  ? "bg-purple-200"
                  : "hover:bg-purple-200"
              }`}
              variant="ghost"
              onClick={() => handleButtonClick("myPulzez")}
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="#000000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M9.002 2.5a.75.75 0 01.691.464l6.302 15.305 2.56-6.301a.75.75 0 01.695-.468h4a.75.75 0 010 1.5h-3.495l-3.06 7.532a.75.75 0 01-1.389.004L8.997 5.21l-3.054 7.329A.75.75 0 015.25 13H.75a.75.75 0 010-1.5h4l3.558-8.538a.75.75 0 01.694-.462z"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
              My Pulzes
            </Button>
          </div>
        </div>

        <div className="py-2" />
      </div>
    </div>
  );
}
