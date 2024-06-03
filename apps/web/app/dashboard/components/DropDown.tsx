import { CreatingWorkspace } from "../../workspace/components/creatingWorkspace";
import { Inviting } from "./Inviting";
import { WorkSpaceSet } from "../../workspace/components/workspaceset";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { workspace } from "./dashboard";
import { AlarmClockOffIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa6";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "ui/components/dropdown";

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
  console.log("workspaces:", props.allWorkspaces);

  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col w-full  text-[#0F172A] ">
      {/* <div className="flex flex-col w-full   bg-red-500"> */}
      <div
        className="flex flex-row justify-center items-center cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <Button className="flex flex-row items-center justify-between text-[#0F172A] font-poppins bg-white hover:bg-white  w-11/12 h-10 font-semibold relative mx-4">
          <span> {props.selectedWorkspace?.name}'s team</span>
          <IoIosArrowDown />
        </Button>
      </div>
      <>
        {toggle && (
          <>
            {/* <div className="flex flex-col justify-center items-center absolute top-40 ml-4 border-2 border-[#8645FF] rounded-md shadow-xl shadow-[#8645FF] bg-[#8645FF] opacity-100 z-40 w-[158px] lg:w-[225px]"> */}
            <div className="flex flex-col justify-center items-center absolute top-40 ml-4 border-2  rounded-md shadow-xl shadow-gray-200 bg-white text-[#0F172A] opacity-100 z-40 w-[158px] lg:w-[225px] gap-2 ">
              <div className="flex flex-col items-center  w-11/12">
                {props.allWorkspaces.map((workspace: workspace) => {
                  return (
                    <>
                      <div
                        // className="flex flex-row justify-center items-center cursor-pointer text-slate-50	"
                        className="flex flex-row justify-between items-center cursor-pointer text-[#0F172A]	 w-full"
                        onClick={() => {
                          props.setSelectedWorkspace(workspace);
                          setToggle(false);
                        }}
                      >
                        <div className="mx-4">{workspace.name}</div>
                        {workspace.workspace_id ==
                        props.selectedWorkspace?.workspace_id ? (
                          <>
                            <div className="mx-4">
                              <FaCheck />
                            </div>
                          </>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <div className=" w-11/12 flex flex-col items-start justify-center gap-1">
                  <p className="">
                    <a className="">
                      <WorkSpaceSet
                        selectedWorkspace={props.selectedWorkspace}
                        updateWorkspace={props.setSelectedWorkspace}
                      />
                    </a>
                  </p>
                  <p className=" ml-1.5">
                    <a className=" ">
                      <Inviting
                        selectedWorkspace={props.selectedWorkspace}
                        updateWorkspace={props.setSelectedWorkspace}
                      />
                    </a>
                  </p>
                  <p className=" ml-0.5">
                    <a className="">
                      <CreatingWorkspace
                        selectedWorkspace={props.selectedWorkspace}
                        updateWorkspace={props.setSelectedWorkspace}
                      />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {/*Anshuls }
        {/* <div className="flex flex-col relative z-10 ">
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
        </div> */}
      </>
    </div>
  );
};

export default DropDown;
