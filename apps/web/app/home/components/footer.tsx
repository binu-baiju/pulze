import React from "react";
import GlobeIcon from "../../../icons/GlobeIcon";
import EnvelopeIcon from "../../../icons/EnvelopeIcon";
import TwitterIcon from "../../../icons/TwitterIcon";
import LinkedInIcon from "../../../icons/LinkedInIcon";

const Footer = () => {
  return (
    <div className="py-40 bg-gradient-to-t from-purple-500 via-purple-100 to-white">
      <div className="flex flex-row justify-evenly flex-wrap">
        <div>
          <div>
            <p className="font-poppins font-bold text-2xl">pulze</p>
          </div>
          <div className="flex flex-row justify-center content-center">
            <p className="font-poppins font-bold text-xl mt-4">
              Built by an Anshul Tiwari And Binu Baiju
            </p>
            <div>
              <GlobeIcon className="scale-[45%]" />
            </div>
          </div>
          <div>
            <p className="font-poppins font-light text-xl flex flex-row">
              Get in touch
              <span className="flex flex-row">
                <EnvelopeIcon />
                <TwitterIcon />
                <LinkedInIcon />
              </span>
            </p>
          </div>
        </div>
        <div className="flex content-end mt-20">
          <p className="font-poppins font-light text-xl">
            All Rights <span className="font-bold">&copy;</span> pulze
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
