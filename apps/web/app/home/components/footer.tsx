import React from "react";
import GlobeIcon from "../../../icons/GlobeIcon";
import EnvelopeIcon from "../../../icons/EnvelopeIcon";
import TwitterIcon from "../../../icons/TwitterIcon";
import LinkedInIcon from "../../../icons/LinkedInIcon";

const Footer = () => {
  return (
    <div className="footer pt-60 border-2 overflow-auto bg-gradient-to-t from-purple-500 via-purple-100 to-white">
      <div className="containe text-center">
        <div className="flex flex-col justify-center items-start ml-64">
          <p className="font-poppins font-bold text-2xl">pulze</p>
          <p className="font-poppins font-bold text-xl flex flex-row">
            Built by an async team around the world
            <GlobeIcon className="scale-[45%] mt-[-15px] ml-[-10px]" />
          </p>
          <p className="font-poppins font-light text-xl flex flex-row">
            Get in touch
            <span className="flex flex-row">
              <EnvelopeIcon />
              <TwitterIcon />
              <LinkedInIcon />
            </span>
            <span className="font-poppins font-light text-xl ml-[420px]">
              All Rights <span className="font-bold">&copy;</span> pulze
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
