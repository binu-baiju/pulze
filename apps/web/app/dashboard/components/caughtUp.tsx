import React from "react";
import CaughtIcon from "../../../icons/FigmaIcon";
const CaughtUp = () => {
  return (
    <div className="flex flex-col content-center items-center mt-4 select-none">
      <div>
        <CaughtIcon />
      </div>
      <div className="font-medium text-lg tracking-wide text-purple-900">
        You are all caught up
      </div>
    </div>
  );
};

export default CaughtUp;
