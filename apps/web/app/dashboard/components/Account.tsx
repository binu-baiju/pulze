import React, { useState } from "react";
import { LogOutPopUp } from "./LogOutPopUp";
import { Settings } from "./AccountSettings";
import { AvatarDemo } from "./avatar";
import { IoIosArrowDown } from "react-icons/io";

const Account = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleLogOut = () => {
    setShowLogOut(!showLogOut);
  };
  const toggleBoth = () => {
    toggleSettings();
    toggleLogOut();
  };

  return (
    <div>
      <div className="relative flex mx-2">
        <p>
          <a className="absolute bottom-1 left-0 flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
            {showLogOut && <LogOutPopUp />}
          </a>
        </p>
        <p>
          <a className="absolute bottom-8 left-0 flex flex-row font-[Inter] font-normal text-sm text-left items-center m-1 ">
            {showSettings && <Settings />}
          </a>
        </p>
      </div>
      <div
        className="flex flex-row items-center justify-center px-2 h-12 cursor-pointer"
        onClick={toggleBoth}
      >
        <div>
          <AvatarDemo />
        </div>
        <p className="px-2">Binu Baiju</p>
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Account;
