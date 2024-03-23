import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";
import { WorkSpaceSet } from "../../workspace/components/workspaceset";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { workspace } from "./dashboard";
import { AlarmClockOffIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  allWorkspaces: Array<workspace>;
  selectedWorkspace: workspace;
  setSelectedWorkspace: (workspace: workspace) => void;
}

export interface WorkspaceProps {
  selectedWorkspace: workspace;
  updateWorkspace: (workspace: workspace) => void;
}
const DropDown = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col w-48 text-[#0F172A]">
      <div
        className="flex flex-row justify-center items-center cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <button className="flex flex-row items-center justify-center text-[#0F172A] font-poppins bg-[#EFEFEF]  w-full h-10 font-semibold relative">
          {props.selectedWorkspace?.name}
          <IoIosArrowDown />
        </button>
      </div>
      <>
        {toggle && (
          <div className="flex flex-col justify-center items-center absolute top-40 border-2 border-[#8645FF] rounded-md shadow-xl shadow-[#8645FF] bg-[#8645FF] opacity-100 z-40 w-[200px]">
            {props.allWorkspaces.map((workspace: workspace) => {
              return (
                <div
                  className="flex flex-row justify-center items-center cursor-pointer text-slate-50	"
                  onClick={() => {
                    props.setSelectedWorkspace(workspace);
                    setToggle(false);
                  }}
                >
                  <div className="mx-4">{workspace.name}</div>
                  {workspace.workspace_id ==
                  props.selectedWorkspace?.workspace_id ? (
                    <div>
                      <FaCheck />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col relative z-10">
          <p>
            <a className="flex flex-row items-center absolute top-16 cursor-pointer font-normal text-sm  font-[Inter] text-left my-3">
              <WorkSpaceSet
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
          <p>
            <a className="flex flex-row font-[Inter] cursor-pointer absolute top-20 font-normal text-sm text-left items-center  mx-3 my-6">
              <Inviting
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
          <p>
            <a className="flex flex-row font-[Inter] cursor-pointer absolute top-24 font-normal text-sm text-left items-center mx-3 my-9 ">
              <CreatingWorkspace
                selectedWorkspace={props.selectedWorkspace}
                updateWorkspace={props.setSelectedWorkspace}
              />
            </a>
          </p>
        </div>
      </>
    </div>
  );
};

export default DropDown;
