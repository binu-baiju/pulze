import React from "react";
import { Input, Button } from "ui/components";
import { AvatarDemo } from "./avatar";
import SuccessIcon from "../../../icons/SuccessIcon";
import LinkIcon from "../../../icons/LinkIcon";
import DustbinIcon from "../../../icons/DustbinIcon";
const NotificationTab = () => {
  return (
    <div className="flex flex-row rounded-lg shadow-xl justify-between mt-3 p-1 items-center content-center select-none">
      <div className="flex flex-row">
        <div className="videolink w-14 h-14 m-0.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-solid"></div>
        <div className="ml-2">
          <h3 className="font-medium font-poppins m-1 text-base text-[#474545] capitalize">
            pulze heading
          </h3>
          <div className="flex inline flex-row">
            <AvatarDemo />
            <p className="font-semibold font-poppins text-[9px] pl-1.5 pt-1 text-[#474545]">
              by Taylor
            </p>
            <p className="font-normal font-poppins mt-1 pl-2 text-[9px] text-[#474545] tracking-wider">
              •Created 1 day before
            </p>
          </div>
        </div>
      </div>
      <div>
        <AvatarDemo />
      </div>
      <div className="flex flex-row">
        <AvatarDemo />
        <div className="font-poppins text-[8px] text-[#474545] ml-2 capitalize">
          <p className="font-semibold">you said</p>
          <div className="flex inline font-light">
            <p>3d</p>
            <p className="ml-2">•hello</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center content-center">
        <SuccessIcon />
        <p className="text-[#42D55A] text-xs ml-2 tracking-wide">
          you responded
        </p>
      </div>
      <div className="flex flex-row mr-10">
        <div className="mx-2 cursor-pointer">
          <LinkIcon />
        </div>
        <div className="mx-2 cursor-pointer">
          <DustbinIcon />
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
