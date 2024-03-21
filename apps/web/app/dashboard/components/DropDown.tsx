import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";
import { WorkSpaceSet } from "../../workspace/components/workspaceset";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropDown = () => {
  const [showInviting, setShowInviting] = useState(false);
  const [showWorkSpace, setShowWorkspace] = useState(false);
  const [showCreateWorkSpace, setShowCreateWorkspace] = useState(false);

  const toggleInviting = () => {
    setShowInviting(!showInviting);
  };

  const toggleWorkSpace = () => {
    setShowWorkspace(!showWorkSpace);
  };

  const toggleCreateWorkSpace = () => {
    setShowCreateWorkspace(!showCreateWorkSpace);
  };

  const toggleAll = () => {
    toggleInviting();
    toggleWorkSpace();
    toggleCreateWorkSpace();
  };
  return (
    <div className="flex flex-col w-48 text-[#0F172A]">
      <div
        className="flex flex-row justify-center items-center cursor-pointer"
        onClick={toggleAll}
      >
        <span className="text-[#0F172A] text-left font-poppins font-semibold">
          Binu Baiju's team
        </span>
        <IoIosArrowDown />
      </div>
      <div className="flex flex-col relative">
        <p>
          <a className="flex flex-row items-center absolute top-1 font-normal text-sm m-1 font-[Inter] text-left ">
            {showWorkSpace && <WorkSpaceSet />}
          </a>
        </p>
        <p>
          <a className="flex flex-row font-[Inter] absolute top-7 font-normal text-sm text-left items-center m-1 ">
            {showInviting && <Inviting />}
          </a>
        </p>
        <p>
          <a className="flex flex-row font-[Inter] absolute top-14 font-normal text-sm text-left items-center m-1 ">
            {showCreateWorkSpace && <CreatingWorkspace />}
          </a>
        </p>
      </div>
    </div>
  );
};

export default DropDown;
